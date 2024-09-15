from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.core.firestore_handler import save_request_data
from app.models.upload_pdfs import upload_pdfs_to_storage
from app.core.vision_computational import extract_text
from app.core.openai_review import openai_review
import uuid

router = APIRouter()

@router.post("/send-info/")
async def send_info(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    annual_income: float = Form(...),
    status: str = "Under Review",
    risk_score: int = 0,
    documents: list[UploadFile] = File(...)
):
    """
    Receives information about a user and their documents, saves the information to Firestore, and uploads the documents to Firebase Storage.
    name: 
    email: 
    phone: 
    annual_income: 
    documents: list of PDF files
    """
    request_id = str(uuid.uuid4())
    request_data = {
        "name": name,
        "email": email,
        "phone": phone,
        "annual_income": annual_income,
        "status": status,
        "risk_score": risk_score
    }
    
    save_request_data(request_id, request_data)
    
    try:
        pdf_urls = upload_pdfs_to_storage(documents, request_id)
        """
        openai_response = {}
        for pdf_url in pdf_urls:
            extracted_text = extract_text(request_id, pdf_url["file_id"])
            openai_response = await openai_review(extracted_text)
            openai_response[pdf_url["file_id"]] = openai_response
        save_request_data(request_id, {"openai_review": openai_response}, merge=True)
        """
    except HTTPException as e:
        return {"status": "error", "detail": str(e)}
    
    return {
        "request_id": request_id,
        "status": "success",
        "uploaded_files": pdf_urls
    }
