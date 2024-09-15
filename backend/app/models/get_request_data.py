from firebase_admin import firestore
from typing import List, Optional


db = firestore.client()

def get_request_data(request_id: str) -> Optional[dict]:
    doc_ref = db.collection("requests").document(request_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    return None


def get_request_data_all(request_id: str) -> Optional[dict]:
    """
    Obtiene los datos de un request y sus documentos desde Firestore.
    """
    doc_ref = db.collection('requests').document(request_id)
    doc = doc_ref.get()

    if not doc.exists:
        return None
    
    request_data = doc.to_dict()

    # Ahora obtenemos la subcolección 'documents'
    documents_ref = doc_ref.collection('documents')
    documents = documents_ref.stream()

    # Recolectamos todos los documentos asociados
    request_data['documents'] = {}
    for document in documents:
        doc_data = document.to_dict()
        request_data['documents'][document.id] = doc_data

    return request_data

def get_all_requests():
    """
    Retrieve all requests from Firestore.

    Returns:
        dict: A dictionary where keys are request IDs and values are request data.
    """
    try:
        db = firestore.client()
        requests_ref = db.collection("requests")
        docs = requests_ref.stream()
        
        # Asegúrate de que los datos se devuelvan como un diccionario
        all_requests = {doc.id: doc.to_dict() for doc in docs}
        return all_requests
    except Exception as e:
        print(f"Error retrieving all requests: {e}")
        return {}
