# Esta es una simulación de la función getDocEval, la cual ya tienes implementada
def getDocEval(document):
    return {
        "prospect": True,
        "valid_documents": 1,
        "annual_income": 10000,
        "income_evaluation": 90,
        "credit_score": 90,
        "detailed_summary": "bla bla bla",
        "document_title": document.filename,
        "document_type": "Financiero"
    }
