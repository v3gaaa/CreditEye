from pdf2image import convert_from_path
import pytesseract
import cv2
import numpy as np
from app.models.get_request_data import get_request_data_all
from firebase_admin import storage
import tempfile

def extract_text(request_id: str, file_id):
    try:
        # Obtener datos del request desde Firestore
        request_data = get_request_data_all(request_id)
        if not request_data:
            exit("Request not found")
        
        # Verificar la estructura de los datos recuperados
        print(request_data)
        documents = request_data.get("documents", {})
        if not documents:
            exit("No documents found for this request")

        # Buscar el documento que coincide con el nombre del archivo
        document_content = next(
            (doc for doc in documents.values() if doc.get("file_id") == file_id), 
            None
        )
        if not document_content:
            exit(f"Document with file_id '{file_id}' not found")

        # Obtener la URL del archivo desde Firebase Storage
        file_url = document_content.get("file_url")
        if not file_url:
            exit("File URL not found")
        # Descargar el archivo desde Firebase Storage a un archivo temporal local
        bucket = storage.bucket()
        blob = bucket.blob(f"{request_id}/{document_content['file_id']}")
        
        # Crear un archivo temporal
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            local_file_path = temp_file.name
            blob.download_to_filename(local_file_path)
        
        # Convertir las páginas del PDF a imágenes
        pages = convert_from_path(local_file_path, 300, first_page=0, last_page=1)  # 300 DPI para mejor precisión
        # CAMBIAR LO DE PAGINAS, AHORITA LO HICE PARA QUE SOLO LEA LA PRIMERA PAGINA

        # Procesar cada página con OCR
        extracted_text = ""
        for page in pages:
            # Convertir la página a una imagen compatible con OpenCV
            open_cv_image = cv2.cvtColor(np.array(page), cv2.COLOR_RGB2BGR)
            
            # Aplicar OCR a la imagen
            extracted_text += pytesseract.image_to_string(open_cv_image)

        print(extracted_text)
        print("File downloaded successfully", local_file_path)
        return extracted_text

    except Exception as e:
        print(str(e))
