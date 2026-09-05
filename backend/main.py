import joblib
import pandas as pd
from typing import List
from fastapi import FastAPI, HTTPException
from backend.core.database import SessionLocal
from backend.models.customer import Customer
from backend.schemas.customers import CustomerSchema

app = FastAPI()

churn_model = joblib.load("ml/churn_prediction/churn_model.pkl")
product_similarity_df = pd.read_csv('data/processed/product_similarity_matrix.csv', index_col=0)

@app.get("/")
def read_root():
    return {"message": "AI E-Commerce Intelligence Platform API is running"}

@app.get("/customers", response_model=List[CustomerSchema])
def get_all_customers():
    session = SessionLocal()
    customers = session.query(Customer).limit(10).all()
    session.close()
    return customers

@app.get("/customers/top-clv", response_model=List[CustomerSchema])
def get_top_clv_customers(limit: int = 10):
    session = SessionLocal()
    customers = session.query(Customer).order_by(Customer.clv.desc()).limit(limit).all()
    session.close()
    return customers

@app.get("/customers/segment/{segment_name}", response_model=List[CustomerSchema])
def get_customers_by_segment(segment_name: str):
    session = SessionLocal()
    customers = session.query(Customer).filter(Customer.segment == segment_name).all()
    session.close()
    return customers

@app.get("/customers/{customer_id}", response_model=CustomerSchema)
def get_customer(customer_id: str):
    session = SessionLocal()
    customer = session.query(Customer).filter(Customer.id == customer_id).first()
    session.close()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@app.get("/customers/{customer_id}/churn-prediction")
def predict_churn(customer_id: str):
    session = SessionLocal()
    customer = session.query(Customer).filter(Customer.id == customer_id).first()
    session.close()

    features = [[
        customer.frequency,
        customer.monetary,
        customer.avg_order_value,
        customer.unique_products,
        customer.tenure_days
    ]]

    prediction = churn_model.predict(features)[0]

    return {
        "customer_id": customer_id,
        "will_churn": bool(prediction)
    }

@app.get("/products/{product_name}/similar")
def get_similar_products(product_name: str, top_n: int = 10):
    if product_name not in product_similarity_df.columns:
        raise HTTPException(status_code=404, detail="Product not found")

    similar_scores = product_similarity_df[product_name].sort_values(ascending=False)
    similar_scores = similar_scores.drop(product_name)
    top_similar = similar_scores.head(top_n)

    return top_similar.to_dict()