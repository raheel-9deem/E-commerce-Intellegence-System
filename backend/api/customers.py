from fastapi import APIRouter, HTTPException
from typing import List
from backend.core.database import SessionLocal
from backend.models.customer import Customer
from backend.schemas.customer import CustomerSchema

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("", response_model=List[CustomerSchema])
def get_all_customers():
    session = SessionLocal()
    customers = session.query(Customer).limit(10).all()
    session.close()
    return customers

@router.get("/top-clv", response_model=List[CustomerSchema])
def get_top_clv_customers(limit: int = 10):
    session = SessionLocal()
    customers = session.query(Customer).order_by(Customer.clv.desc()).limit(limit).all()
    session.close()
    return customers

@router.get("/segment/{segment_name}", response_model=List[CustomerSchema])
def get_customers_by_segment(segment_name: str):
    session = SessionLocal()
    customers = session.query(Customer).filter(Customer.segment == segment_name).all()
    session.close()
    return customers

@router.get("/{customer_id}", response_model=CustomerSchema)
def get_customer(customer_id: str):
    session = SessionLocal()
    customer = session.query(Customer).filter(Customer.id == customer_id).first()
    session.close()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer