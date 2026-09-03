from typing import List
from fastapi import FastAPI
from backend.core.database import SessionLocal
from backend.models.customer import Customer
from backend.schemas.customers import CustomerSchema

app = FastAPI()

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