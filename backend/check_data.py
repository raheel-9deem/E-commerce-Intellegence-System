from backend.core.database import SessionLocal
from backend.models.customer import Customer

session = SessionLocal()

total = session.query(Customer).count()
print("Total customers in DB:", total)

first_customer = session.query(Customer).first()
print(first_customer.id, first_customer.segment, first_customer.clv)

session.close()