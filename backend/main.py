import joblib
from typing import List
from fastapi import FastAPI
from backend.core.database import SessionLocal
from backend.models.customer import Customer
from backend.schemas.customers import CustomerSchema

app = FastAPI()

churn_model = joblib.load("ml/churn_prediction/churn_model.pkl")

@app.get("/")
def read_root():
    return {"message": "AI E-Commerce Intelligence Platform API is running"}

@app.get("/customers", response_model=List[CustomerSchema])
def get_all_customers():
    session = SessionLocal()
    customers = session.query(Customer).limit(10).all()
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