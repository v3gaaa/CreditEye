from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from firebase_admin import storage
import uuid
from app.core.firestore_handler import save_document_data
from app.middleware.get_user import get_current_user

router = APIRouter()

@router.post("/upload-pdfs/")
async def upload_pdfs(
    files: list[UploadFile] = File(...),
    token: str = Depends(get_current_user)
    ):
    user_id = token['uid']  # ID único del usuario autenticado
    pdf_urls = []
    bucket = storage.bucket()  # Obtén el bucket de Firebase Storage

    for file in files:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail=f"{file.filename} is not a PDF")
        
        # Generar un nombre único para cada archivo
        file_id = str(uuid.uuid4()) + ".pdf"
        blob = bucket.blob(file_id)
        
        # Guarda el archivo en Firebase Storage
        blob.upload_from_file(file.file, content_type=file.content_type)
        
        # Guarda la información del documento en Firestore
        document_data = {
            "filename": file.filename,
            "file_id": file_id,
            "user_id": user_id  # Relacionar el archivo con el usuario
        }
        save_document_data(file_id, document_data)
        
        # Obtén la URL pública del archivo
        file_url = blob.public_url
        pdf_urls.append({"filename": file.filename, "file_id": file_id, "file_url": file_url})
    
    return {"successful": True, "uploaded_files": pdf_urls}
