from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.core.firestore_handler import save_request_data
from app.models.get_info_model_openai import get_info_model_openai
from app.core.openai_review import openai_review_final

router = APIRouter()

@router.get("/get-review-desc/{request_id}/")
async def get_review_desc(request_id: str):
    try:
        review_desc = get_info_model_openai(request_id)  # Función que obtenga la descripción del modelo
        final_inference = await openai_review_final(review_desc)
        if not review_desc:
            raise HTTPException(status_code=404, detail="Review description not found")
        
        relevant_data = {"address": "San Pedro Garza", "phone": "1234567890", "email": "tec@gg.com"}
        
        return {"should_approve": True, "explanation": final_inference, "relevant_data": relevant_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
