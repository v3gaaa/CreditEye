from fastapi import APIRouter, HTTPException
from app.models.get_request_data import get_request_data_all
from app.models.update_request_data import update_request_data

router = APIRouter()

@router.post("/update-review-info/{request_id}/")
async def update_review_info(request_id: str):
    try:
        # Obtener datos actuales de Firestore
        request_data = get_request_data_all(request_id)
        if not request_data:
            raise HTTPException(status_code=404, detail="Request not found")
        
        documents = request_data.get("documents", {})
        
        # Actualizar el estado de los documentos (si es necesario)
        document_status = {}
        for doc_name, doc_content in documents.items():
            document_status[doc_name] = {
                "legible": True  # Lógica para determinar si el documento es legible
            }
        
        # Crear el objeto de datos actualizado
        updated_data = {
            "name": request_data["name"],
            "email": request_data["email"],
            "income": request_data["annual_income"],
            "credit_score": request_data["risk_score"],
            "phone": request_data["phone"],
            "documents": document_status
        }
        # Actualizar los datos en Firestore
        update_request_data(request_id, updated_data)
        
        return updated_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
