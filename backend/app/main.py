from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health, send_info, basic_request, review_info, get_document, edit_risk_score, approve_reject_request, get_all_requests, vision, update_review_info, review_description_openai
import uvicorn
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routes from different modules
app.include_router(health.router)
app.include_router(vision.router)
app.include_router(send_info.router)
app.include_router(basic_request.router)
app.include_router(review_info.router)
app.include_router(get_document.router)
app.include_router(edit_risk_score.router)
app.include_router(approve_reject_request.router)
app.include_router(get_all_requests.router)
app.include_router(update_review_info.router)
app.include_router(review_description_openai.router)

if __name__ == "__main__":
    port = os.getenv("PORT", 5555)
    uvicorn.run(app, host="0.0.0.0", port=port)
    print(f"Starting server on http://127.0.0.1:{port}")
