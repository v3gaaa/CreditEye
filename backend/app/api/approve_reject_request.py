from fastapi import APIRouter, HTTPException
from app.models.update_request_data import update_request_data  # Asegúrate de tener esta función para actualizar datos

router = APIRouter()

@router.put("/reject-request/{request_id}/")
async def reject_request(request_id: str):
    """
    Reject a request by setting the status to 'Rejected'.
    """
    try:
        # Actualizar el status en Firestore
        success = update_request_data(request_id, {"status": "Rejected"})
        if not success:
            raise HTTPException(status_code=404, detail="Request not found or update failed")

        return {"status": "success", "message": "Request rejected successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/approve-request/{request_id}/")
async def approve_request(request_id: str):
    """
    Approve a request by setting the status to 'Approved'.
    """
    try:
        # Actualizar el status en Firestore
        success = update_request_data(request_id, {"status": "Approved"})
        if not success:
            raise HTTPException(status_code=404, detail="Request not found or update failed")

        return {"status": "success", "message": "Request approved successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.put("/request-more-info/{request_id}/")
async def request_more_info(request_id: str):
    """
    Approve a request by setting the status to 'Approved'.
    """
    try:
        # Actualizar el status en Firestore
        success = update_request_data(request_id, {"status": "More Info"})
        if not success:
            raise HTTPException(status_code=404, detail="Request not found or update failed")

        return {"status": "success", "message": "Request approved successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))