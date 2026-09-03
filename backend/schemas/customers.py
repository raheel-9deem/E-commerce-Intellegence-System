from pydantic import BaseModel

class CustomerSchema(BaseModel):
    id: str
    recency: int
    frequency: int
    monetary: float
    segment: str
    churned: int
    clv: float

    class Config:
        from_attributes = True