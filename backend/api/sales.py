from fastapi import APIRouter
import pandas as pd

router = APIRouter(prefix="/sales", tags=["Sales"])

forecast_df = pd.read_csv('data/processed/sales_forecast.csv')
forecast_df['ds'] = pd.to_datetime(forecast_df['ds'])

@router.get("/forecast")
def get_forecast(days: int = 30):
    upcoming = forecast_df.tail(days)
    result = upcoming[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].copy()
    result['ds'] = result['ds'].dt.strftime('%Y-%m-%d')
    return result.to_dict(orient='records')