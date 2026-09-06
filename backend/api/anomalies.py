from fastapi import APIRouter
import pandas as pd

router = APIRouter(prefix="/transactions", tags=["Anomalies"])

anomaly_df = pd.read_csv('data/processed/anomaly_results.csv')

@router.get("/anomalies")
def get_anomalies(limit: int = 20):
    flagged = anomaly_df[anomaly_df['Anomaly'] == -1]
    top_flagged = flagged.sort_values('TotalAmount', ascending=False).head(limit)
    return top_flagged.to_dict(orient='records')