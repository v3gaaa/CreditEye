from fastapi import APIRouter, HTTPException
from app.models.get_request_data import get_all_requests  # Asegúrate de tener esta función implementada

router = APIRouter()

@router.get("/get-all-requests/")
async def get_all_requests_info():
    """
    Returns basic information about all requests including their request_id.
    """
    try:
        all_requests = get_all_requests()  # Función que obtenga todos los datos de requests desde Firestore
        if not all_requests:
            raise HTTPException(status_code=404, detail="No requests found")
        
        # Mapear los datos de cada request a la estructura deseada
        result = [
            {
                "id": doc_id,  # El ID del documento
                "name": request.get("name"),
                "status": request.get("status"),
                "risk_score": request.get("risk_score")
            }
            for doc_id, request in all_requests.items()  # Asegúrate de que all_requests es un diccionario
        ]
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
