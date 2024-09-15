from firebase_admin import firestore

db = firestore.client()

def save_request_data(request_id: str, data: dict):
    doc_ref = db.collection("requests").document(request_id)
    doc_ref.set(data)