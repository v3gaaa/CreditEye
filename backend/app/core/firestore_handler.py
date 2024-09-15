from firebase_config import db

def save_request_data(request_id, data, merge=False):
    """
    Guarda la información del request en Firestore.
    Si algo falla quitar merge
    """
    doc_ref = db.collection('requests').document(request_id)
    doc_ref.set(data, merge=merge)

def get_request_data(request_id):
    """
    Obtiene la información del request desde Firestore.
    """
    doc_ref = db.collection('requests').document(request_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return None

def save_document_to_request(request_id, document_id, data):
    """
    Guarda la información del documento en la subcolección 'documents' del request.
    """
    doc_ref = db.collection('requests').document(request_id).collection('documents').document(document_id)
    doc_ref.set(data)
