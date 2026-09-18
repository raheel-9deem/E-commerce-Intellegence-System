from ai.query_templates.templates import get_top_product_stats, get_monthly_sales_stats, get_segment_stats
from ai.llm_client.client import ask_claude

stats = f"""
{get_top_product_stats()}
{get_monthly_sales_stats()}
{get_segment_stats()}
"""

question = "Business overall kaisa chal raha hai? Koi important insight batao."
answer = ask_claude(stats, question)
print(answer)