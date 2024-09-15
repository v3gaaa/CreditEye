from firebase_admin import firestore
from typing import List, Optional
from app.models.get_request_data import get_request_data_all
from app.core.openai_review import openai_review_final
import asyncio

db = firestore.client()

def get_info_model_openai(request_id: str) -> Optional[str]:
    request_data = get_request_data_all(request_id)
    # Verificar la estructura de los datos recuperados
    documents = request_data.get("documents", {})
    #print(documents)
    documents_info = str(documents)
    print(documents_info)
    print(type(documents_info))

    #final_inference = await openai_review_final(documents_info)

    return documents_info  # Ejemplo estático
