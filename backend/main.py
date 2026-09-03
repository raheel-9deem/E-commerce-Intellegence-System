from fastapi import FastAPI
from backend.core.database import SessionLocal
from backend.models.customer import Customer

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI E-Commerce Intelligence Platform API is running"}

@app.get("/customers")
def get_all_customers():
    session = SessionLocal()
    customers = session.query(Customer).limit(10).all()
    session.close()
    return customers