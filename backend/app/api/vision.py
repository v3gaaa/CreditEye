from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from app.core.vision_computational import extract_text

router = APIRouter()

# Ruta para procesar una imagen con visión computacional
@router.get("/process-image/{request_id}")
async def process_image_route(
        request_id: str,
        file_id: str = Body(..., embed=True)
):
    extract_text(request_id, file_id)
    return {"message": "Image processed successfully"}