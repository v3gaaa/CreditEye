from firebase_admin import firestore

db = firestore.client()

def update_document_data(request_id: str, file_id: str, update_data: dict):
    """
    Updates the document information in the 'documents' subcollection for a given request_id.
    """
    try:
        request_ref = db.collection("requests").document(request_id).collection("documents").document(file_id)
        request_ref.update(update_data)
    except Exception as e:
        raise Exception(f"Error updating document data: {str(e)}")
