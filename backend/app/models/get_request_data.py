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

