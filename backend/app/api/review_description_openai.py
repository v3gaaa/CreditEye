from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.core.firestore_handler import save_request_data

router = APIRouter()

@router.get("/get-review-desc/{request_id}/")
async def get_review_desc(request_id: str):
    try:
        review_desc = get_info_model_openai(request_id)  # Función que obtenga la descripción del modelo
        if not review_desc:
            raise HTTPException(status_code=404, detail="Review description not found")
        
        return {"review_description": review_desc}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
