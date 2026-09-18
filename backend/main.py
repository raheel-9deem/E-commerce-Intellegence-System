from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api import customers, churn, recommendations, sales, anomalies, dashboard, ai_analyst

app = FastAPI(title="AI E-Commerce Intelligence Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customers.router)
app.include_router(churn.router)
app.include_router(recommendations.router)
app.include_router(sales.router)
app.include_router(anomalies.router)
app.include_router(dashboard.router)
app.include_router(ai_analyst.router)

@app.get("/")
def read_root():
    return {"message": "AI E-Commerce Intelligence Platform API is running"}