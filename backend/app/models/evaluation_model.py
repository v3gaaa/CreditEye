from pydantic import BaseModel

class DocumentEvaluation(BaseModel):
    prospect: bool
    valid_documents: int
    annual_income: float
    income_evaluation: int
    credit_score: int
    detailed_summary: str
    document_title: str
    document_type: str
