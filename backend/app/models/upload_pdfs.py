from fastapi import APIRouter, UploadFile, File, HTTPException
from firebase_admin import storage
import uuid
from app.core.firestore_handler import save_document_to_request

router = APIRouter()

def upload_pdfs_to_storage(files: list[UploadFile], request_id: str):
    pdf_urls = []
    bucket = storage.bucket()  # Obtén el bucket de Firebase Storage

    for file in files:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail=f"{file.filename} is not a PDF")
        
        # Generar un nombre único para cada archivo
        file_id = str(uuid.uuid4()) + ".pdf"
        blob = bucket.blob(f"{request_id}/{file_id}")  # Guardar en una carpeta con el nombre del request_id
        
        # Guarda el archivo en Firebase Storage
        blob.upload_from_file(file.file, content_type=file.content_type)
        
        # Guarda la información del documento en Firestore
        document_data = {
            "filename": file.filename,
            "file_id": file_id,
            "file_url": blob.public_url,  # URL pública del archivo
            "request_id": request_id  # Asociar el archivo con el request_id
        }
        save_document_to_request(request_id, file_id, document_data)
        
        # Agregar la URL del archivo a la lista
        pdf_urls.append({"filename": file.filename, "file_id": file_id, "file_url": blob.public_url})
    
    return pdf_urls
