from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.doc_evaluation import getDocEval
import uuid
from app.core.firestore_handler import save_document_data

router = APIRouter()

# Ruta para evaluar un documento y devolver la evaluación en JSON
@router.post("/evaluate-document/")
async def evaluate_document(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    # Evaluar el documento con la función getDocEval
    evaluation = getDocEval(file)

    # Opcional: Guarda la evaluación en Firestore
    document_id = str(uuid.uuid4())
    save_document_data(document_id, evaluation)
    
    return {"document-evaluation": evaluation}
