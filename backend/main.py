import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.database import Base, engine, SessionLocal
from backend.models.customer import Customer
from backend.api import customers, churn, recommendations, sales, anomalies, dashboard, ai_analyst

app = FastAPI(title="AI E-Commerce Intelligence Platform API")

def initialize_database():
    Base.metadata.create_all(bind=engine)

    session = SessionLocal()
    existing_count = session.query(Customer).count()

    if existing_count == 0:
        df = pd.read_csv('data/processed/clv_results.csv')
        df['Customer ID'] = df['Customer ID'].astype(str)

        df_sales = pd.read_csv('data/processed/online_retail_sales_cleaned.csv')
        df_sales['InvoiceDate'] = pd.to_datetime(df_sales['InvoiceDate'])
        df_sales['Customer ID'] = df_sales['Customer ID'].astype(str)

        snapshot_date = df_sales['InvoiceDate'].max() + pd.Timedelta(days=1)
        unique_products = df_sales.groupby('Customer ID')['StockCode'].nunique()
        df['UniqueProducts'] = df['Customer ID'].map(unique_products)

        first_purchase = df_sales.groupby('Customer ID')['InvoiceDate'].min()
        tenure_series = (snapshot_date - first_purchase).dt.days
        df['TenureDays'] = df['Customer ID'].map(tenure_series)

        for _, row in df.iterrows():
            customer = Customer(
                id=row['Customer ID'],
                recency=int(row['Recency']),
                frequency=int(row['Frequency']),
                monetary=float(row['Monetary']),
                segment=row['Segment'],
                churned=int(row['Churned']),
                clv=float(row['CLV']),
                avg_order_value=float(row['AvgOrderValue']),
                unique_products=int(row['UniqueProducts']),
                tenure_days=int(row['TenureDays'])
            )
            session.add(customer)
        session.commit()

    session.close()

initialize_database()

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