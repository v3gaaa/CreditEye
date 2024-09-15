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
async def openai_review(extracted_text: str) -> dict:
    try:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that extracts keywords from text."},
                {"role": "user", "content": f"Extract keywords from the following text:\n{extracted_text}"}
            ]
        )

        generated_text = completion.choices[0].message.content.strip()
        keywords = [word.strip() for word in generated_text.split(',')]

        keyword_descriptions = {}
        for keyword in keywords:
            description_response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an assistant that provides detailed descriptions of keywords."},
                    {"role": "user", "content": f"Provide a description for the keyword: {keyword}"}
                ]
            )
            
            description_text = description_response.choices[0].message.content.strip()
            keyword_descriptions[keyword] = description_text

        return keyword_descriptions

    except Exception as e:
        print(f"Error during OpenAI request: {e}")
        return {}
