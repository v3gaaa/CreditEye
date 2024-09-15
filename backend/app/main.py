from fastapi import FastAPI
#from app.api import upload, evaluation, vision, health, send_info
from app.api import health, send_info, basic_request, review_info, get_document
import uvicorn
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Incluir las rutas de los diferentes módulos
app.include_router(health.router)
#app.include_router(upload.router)
#app.include_router(evaluation.router)
#app.include_router(vision.router)
app.include_router(send_info.router)
app.include_router(basic_request.router)
app.include_router(review_info.router)
app.include_router(get_document.router)


if __name__ == "__main__":
    port = os.getenv("PORT", 5555)
    uvicorn.run(app, host="0.0.0.0", port=port)
    print(f"Starting server on http://127.0.0.1:{port}")
