from fastapi import APIRouter
from sqlalchemy import func
from backend.core.database import SessionLocal
from backend.models.customer import Customer

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def get_dashboard_summary():
    session = SessionLocal()

    total_customers = session.query(func.count(Customer.id)).scalar()
    total_revenue = session.query(func.sum(Customer.monetary)).scalar()
    avg_clv = session.query(func.avg(Customer.clv)).scalar()

    segment_counts = (
        session.query(Customer.segment, func.count(Customer.id))
        .group_by(Customer.segment)
        .all()
    )

    churned_count = session.query(func.count(Customer.id)).filter(Customer.churned == 1).scalar()

    session.close()

    return {
        "total_customers": total_customers,
        "total_revenue": round(total_revenue, 2),
        "avg_clv": round(avg_clv, 2),
        "churned_customers": churned_count,
        "segment_breakdown": dict(segment_counts)
    }