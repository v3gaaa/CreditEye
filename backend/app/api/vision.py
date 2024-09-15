from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.vision_computational import process_image

router = APIRouter()

# Ruta para procesar una imagen con visión computacional
@router.post("/process-image/")
async def process_image_route(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Only image files are accepted")
    
    # Procesar la imagen con una función de visión computacional
    result = process_image(file)
    
    return {"image-processing-result": result}
