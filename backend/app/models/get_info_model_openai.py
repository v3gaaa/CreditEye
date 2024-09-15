from firebase_admin import firestore
from typing import List, Optional


db = firestore.client()

def get_info_model_openai(request_id: str) -> Optional[str]:
    # Implementa la llamada a tu función OpenAI aquí
    # Por ejemplo:
    # response = openai.Completion.create(engine="text-davinci", prompt=f"Describe the request {request_id}")
    # return response.choices[0].text.strip()
    return "Descripción del modelo OpenAI"  # Ejemplo estático
