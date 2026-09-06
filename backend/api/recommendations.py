from fastapi import APIRouter, HTTPException
import pandas as pd

router = APIRouter(prefix="/products", tags=["Recommendations"])

product_similarity_df = pd.read_csv('data/processed/product_similarity_matrix.csv', index_col=0)

df = pd.read_csv('data/processed/online_retail_sales_cleaned.csv')
df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])

@router.get("/{product_name}/similar")
def get_similar_products(product_name: str, top_n: int = 5):
    if product_name not in product_similarity_df.columns:
        raise HTTPException(status_code=404, detail="Product not found")

    similar_scores = product_similarity_df[product_name].sort_values(ascending=False)
    similar_scores = similar_scores.drop(product_name)
    top_similar = similar_scores.head(top_n)

    return top_similar.to_dict()

@router.get("/{product_name}/demand-forecast")
def get_demand_forecast(product_name: str, days: int = 30):
    product_sales = df[df['Description'] == product_name]

    if product_sales.empty:
        raise HTTPException(status_code=404, detail="Product not found")

    recent_data = product_sales.sort_values('InvoiceDate').tail(90)
    avg_daily_demand = recent_data['Quantity'].sum() / 90
    forecasted_demand = round(avg_daily_demand * days)

    return {
        "product": product_name,
        "avg_daily_demand": round(avg_daily_demand, 2),
        "forecast_period_days": days,
        "forecasted_demand": forecasted_demand
    }