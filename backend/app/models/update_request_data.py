from firebase_admin import firestore

def update_request_data(request_id: str, update_data: dict) -> bool:
    """
    Update request data in Firestore.

    Args:
        request_id (str): The ID of the request to update.
        update_data (dict): The data to update.

    Returns:
        bool: True if the update was successful, False otherwise.
    """
    try:
        db = firestore.client()
        doc_ref = db.collection("requests").document(request_id)
        doc_ref.update(update_data)
        return True
    except Exception as e:
        print(f"Error updating request data: {e}")
        return False
