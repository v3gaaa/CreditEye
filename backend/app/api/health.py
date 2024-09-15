from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class HealthResponse(BaseModel):
    status: str
    message: str

@router.get("/health", response_model=HealthResponse)
@router.post("/health", response_model=HealthResponse)
async def health_check():
    """
    Returns the status of the server.
    """
    return {"status": "OK", "message": "Server is running"}
