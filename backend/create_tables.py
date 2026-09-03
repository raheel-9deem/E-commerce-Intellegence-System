from backend.core.database import Base, engine
from backend.models.customer import Customer

Base.metadata.create_all(bind=engine)
print("Tables created successfully!")