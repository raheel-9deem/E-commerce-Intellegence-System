from fastapi import APIRouter, HTTPException
import joblib
from backend.core.database import SessionLocal
from backend.models.customer import Customer

router = APIRouter(prefix="/customers", tags=["Churn"])

churn_model = joblib.load("ml/churn_prediction/churn_model.pkl")

@router.get("/{customer_id}/churn-prediction")
def predict_churn(customer_id: str):
    session = SessionLocal()
    customer = session.query(Customer).filter(Customer.id == customer_id).first()
    session.close()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

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