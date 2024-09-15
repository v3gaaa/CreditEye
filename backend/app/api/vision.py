from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from app.core.vision_computational import extract_text
from app.core.openai_review import openai_review

router = APIRouter()

# Ruta para procesar una imagen con visión computacional
@router.get("/process-image/{request_id}")
async def process_image_route(
        request_id: str,
        file_id: str = Body(..., embed=True)
):
    extracted_text = extract_text(request_id, file_id)
    openai_response = openai_review(extracted_text)
    # Guardar en firebase
    # send-info
    return {"message": "Image processed successfully",
            "openai_response": openai_response}