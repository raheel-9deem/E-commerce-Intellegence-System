from fastapi import APIRouter
from ai.query_templates.templates import get_top_product_stats, get_monthly_sales_stats, get_segment_stats
from ai.llm_client.client import ask_claude

router = APIRouter(prefix="/ai", tags=["AI Analyst"])

@router.get("/ask")
def ask_business_question(question: str = "Business overall kaisa chal raha hai?"):
    stats = f"""
{get_top_product_stats()}
{get_monthly_sales_stats()}
{get_segment_stats()}
"""
    answer = ask_claude(stats, question)
    return {"question": question, "answer": answer}