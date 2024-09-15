import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Leer variables de entorno
firebase_credentials_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
firebase_storage_bucket = os.getenv("FIREBASE_STORAGE_BUCKET")

# Verificar si las variables de entorno están configuradas correctamente
if firebase_credentials_path is None:
    raise ValueError("La variable de entorno FIREBASE_CREDENTIALS_PATH no está definida")
if firebase_storage_bucket is None:
    raise ValueError("La variable de entorno FIREBASE_STORAGE_BUCKET no está definida")

# Inicializa la app de Firebase con credenciales
cred = credentials.Certificate(firebase_credentials_path)
firebase_admin.initialize_app(cred, {
    'storageBucket': firebase_storage_bucket
})

# Acceso a Firestore
db = firestore.client()
