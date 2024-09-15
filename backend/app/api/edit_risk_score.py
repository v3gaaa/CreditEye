from fastapi import APIRouter, HTTPException, Body
from app.models.update_request_data import update_request_data  # Asegúrate de tener una función para actualizar datos
from pydantic import BaseModel

router = APIRouter()

class RiskScoreUpdate(BaseModel):
    risk_score: int

@router.put("/edit-risk-score/{request_id}/")
async def edit_risk_score(
    request_id: str,
    risk_score_update: RiskScoreUpdate
):
    """
    Update the risk score of a request.
    Receives the request ID and the new risk score.

    {
        "risk_score": 4
    }
    """
    try:
        # Llama a una función para actualizar el riesgo en Firestore
        success = update_request_data(request_id, {"risk_score": risk_score_update.risk_score})
        if not success:
            raise HTTPException(status_code=404, detail="Request not found or update failed")

        return {"status": "success", "message": "Risk score updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
