from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.core.firestore_handler import save_request_data
from app.models.get_request_data import get_request_data_all
from app.models.update_document_data import update_document_data
from app.models.upload_pdfs import upload_pdfs_to_storage
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
    request_id: Unique identifier for the request.
    name: Updated name of the user.
    email: Updated email of the user.
    phone: Updated phone number of the user.
    annual_income: Updated annual income of the user.
    risk_score: Updated risk score of the user.
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
        
        # Fetch updated data to include new document URLs
        updated_request_data = get_request_data_all(request_id)
        if not updated_request_data:
            raise HTTPException(status_code=404, detail="Request not found")
        
        # Prepare new document data for Firestore
        new_documents = [
            {
                "filename": doc.filename,
                "file_id": url["file_id"],  # Ensure this is returned by upload_pdfs_to_storage
                "file_url": url["file_url"]  # Ensure this is returned by upload_pdfs_to_storage
            } for doc, url in zip(documents, pdf_urls)
        ]
        
        # Update Firestore with new document URLs
        for doc_data in new_documents:
            update_document_data(request_id, doc_data["file_id"], {
                "filename": doc_data["filename"],
                "file_url": doc_data["file_url"]
            })
        
        return {
            "request_id": request_id,
            "status": "success",
            "uploaded_files": pdf_urls
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
