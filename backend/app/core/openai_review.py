from openai import OpenAI
import os
from dotenv import load_dotenv

# Cargar las variables del archivo .env
load_dotenv()

# Configurar la clave API de OpenAI
api_key = os.getenv("OPENAI_API_KEY")

# Inicializar el cliente OpenAI
client = OpenAI(api_key=api_key)

# Función para realizar la solicitud de chat
async def openai_review(extracted_text: str, tipo_documento) -> dict:
    try:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un experto en asesorar PYMEs para ayudarles a obtener créditos. Tu objetivo es analizar documentos de onboarding de empresas y extraer los insights más importantes, evaluando el riesgo financiero y proporcionando recomendaciones sobre su viabilidad crediticia. Estás especializado en evaluar información clave como historial financiero, solvencia, garantías, y perfil de riesgo."},
                {"role": "user", "content": f"Analiza el siguiente documento de {tipo_documento}. Este documento es parte del proceso de evaluación de una PYME para un crédito. Tu trabajo es proporcionar un análisis detallado, resaltando los factores clave para la aprobación del crédito, riesgos financieros, posibles puntos débiles o fortalezas, y cualquier recomendación que consideres relevante para la toma de decisiones. Aquí está el texto:\n{extracted_text}"}

            ]
        )

        generated_text = completion.choices[0].message.content
        return generated_text

    except Exception as e:
        print(f"Error during OpenAI request: {e}")
        return {}

async def openai_review_final(documents_info):
    try:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un experto en asesorar PYMEs para ayudarles a obtener créditos. Tu objetivo es analizar documentos de onboarding de empresas y extraer los insights más importantes, evaluando el riesgo financiero y proporcionando recomendaciones sobre su viabilidad crediticia. Estás especializado en evaluar información clave como historial financiero, solvencia, garantías, y perfil de riesgo."},
                {"role": "user", "content": f"En base a esta informacion recabada de los documentos financieros de una pyme, determina si sería apta para un creditos. Aquí está la información:\n{documents_info}"}

            ]
        )

        generated_text = completion.choices[0].message.content
        return generated_text

    except Exception as e:
        print(f"Error during OpenAI request: {e}")
        return {}

async def openai_review_final_boolean(final_inference):
    try:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un experto en asesorar PYMEs para ayudarles a obtener créditos. Tu objetivo es analizar documentos de onboarding de empresas y extraer los insights más importantes, evaluando el riesgo financiero y proporcionando recomendaciones sobre su viabilidad crediticia. Estás especializado en evaluar información clave como historial financiero, solvencia, garantías, y perfil de riesgo."},
                {"role": "user", "content": f"Basado en esta decision final, responde con 'True' o 'False' si la empresa debería ser aprobada para un crédito. Aquí está la información:\n{final_inference}. SOLO RESPONDE CON 'True' o 'False'."}

            ]
        )

        generated_text = completion.choices[0].message.content
        return generated_text

    except Exception as e:
        print(f"Error during OpenAI request: {e}")
        return {}
    
async def openai_review_relevant_data(documents_info):

    relevant_data = {"address": "San Pedro Garza", "phone": "1234567890", "email": "tec@gg.com"}
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "Eres un experto en asesorar PYMEs para ayudarles a obtener créditos. Tu objetivo es analizar documentos de onboarding de empresas y extraer los insights más importantes, evaluando el riesgo financiero y proporcionando recomendaciones sobre su viabilidad crediticia. Estás especializado en evaluar información clave como historial financiero, solvencia, garantías, y perfil de riesgo."},
                {"role": "user", "content": f"En base a esta informacion recabada de los documentos financieros y personales de una pyme, necesito que me des alguna data muy relevante que encuentres de los documentos. Aquí está la información:\n{documents_info}. Responde en formato de json, como este, dependiendo de que tanto o poco encuentres: {relevant_data}"}

            ],
            response_format={"type": "json_object"}
        )

        generated_text = completion.choices[0].message.content
        return generated_text

    except Exception as e:
        print(f"Error during OpenAI request: {e}")
        return {}