from fastapi import HTTPException
from firebase_admin import auth

# Middleware para verificar el token de Firebase
async def get_current_user(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except:
        raise HTTPException(status_code=401, detail="Invalid token")