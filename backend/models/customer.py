from sqlalchemy import Column, String, Float, Integer
from backend.core.database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True, index=True)
    recency = Column(Integer)
    frequency = Column(Integer)
    monetary = Column(Float)
    segment = Column(String)
    churned = Column(Integer)
    clv = Column(Float)