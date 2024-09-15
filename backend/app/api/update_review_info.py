from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.core.firestore_handler import save_request_data
from app.models.get_request_data import get_request_data_all
from app.models.update_document_data import update_document_data
from app.models.upload_pdfs import upload_pdfs_to_storage
from app.core.vision_computational import extract_text
from app.core.openai_review import openai_review
import uuid

router = APIRouter()

@router.put("/update-review-info/{request_id}/")
async def update_request(
    request_id: str,
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    annual_income: float = Form(...),
    risk_score: int = Form(...),
    status: str = Form(...),
    documents: list[UploadFile] = File(...)
):
    """
    Updates user information and uploads new documents for a given request_id.
    Also re-analyzes the new documents using AI to update their legibility status and review data.
    request_id: Unique identifier for the request.
    name: Updated name of the user.
    email: Updated email of the user.
    phone: Updated phone number of the user.
    annual_income: Updated annual income of the user.
    risk_score: Updated risk score of the user.
    status: Updated status of the request.
    documents: List of new PDF files to be uploaded.
    """
    try:
        # Update user information in Firestore
        request_data = {
            "name": name,
            "email": email,
            "phone": phone,
            "annual_income": annual_income,
            "risk_score": risk_score,
            "status": status
        }
        save_request_data(request_id, request_data)
        
        # Upload new documents to Firebase Storage
        pdf_urls = upload_pdfs_to_storage(documents, request_id)
        
        # Analyze each document using AI and update Firestore with results
        for pdf_url in pdf_urls:
            # Extract text from the document
            extracted_text = extract_text(request_id, pdf_url["file_id"])
            
            # Analyze the text using OpenAI
            openai_response = await openai_review(extracted_text, pdf_url["file_id"])
            
            # Determine if the document is legible based on AI response
            legible = True if len(openai_response) > 50 else False
            
            # Update document data in Firestore
            updated_data = {
                'filename': pdf_url["filename"],
                'file_url': pdf_url["file_url"],
                'legible': legible,
                'openAi_response': openai_response
            }
            update_document_data(request_id, pdf_url["file_id"], updated_data)
        
        # Fetch updated data to include new document URLs and analysis results
        updated_request_data = get_request_data_all(request_id)
        if not updated_request_data:
            raise HTTPException(status_code=404, detail="Request not found")

        return {
            "request_id": request_id,
            "status": "success",
            "uploaded_files": pdf_urls
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
