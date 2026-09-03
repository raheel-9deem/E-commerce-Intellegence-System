import pandas as pd
from backend.core.database import SessionLocal
from backend.models.customer import Customer

df = pd.read_csv('data/processed/clv_results.csv')
df['Customer ID'] = df['Customer ID'].astype(str)

session = SessionLocal()

for _, row in df.iterrows():
    customer = Customer(
        id=row['Customer ID'],
        recency=int(row['Recency']),
        frequency=int(row['Frequency']),
        monetary=float(row['Monetary']),
        segment=row['Segment'],
        churned=int(row['Churned']),
        clv=float(row['CLV'])
    )
    session.add(customer)

session.commit()
print(f"{len(df)} customers added to database!")