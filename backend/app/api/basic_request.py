from fastapi import APIRouter, HTTPException
from app.models.get_request_data import get_request_data

router = APIRouter()

@router.get("/get-basic-request/{request_id}/")
async def get_request(request_id: str):
    """
    Returns basic information about a request.
    "name": "Spiegelin",
    "status": "Under Review",
    "risk_score": 0
    """
    try:
        request_data = get_request_data(request_id)  # Función que obtenga datos de Firestore
        if not request_data:
            raise HTTPException(status_code=404, detail="Request not found")
        
        return {
            "name": request_data.get("name"),
            "status": request_data.get("status"),
            "risk_score": request_data.get("risk_score")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
