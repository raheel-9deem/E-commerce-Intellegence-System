import pandas as pd
from backend.core.database import SessionLocal
from backend.models.customer import Customer

# Main CLV file load karo
df = pd.read_csv('data/processed/clv_results.csv')
df['Customer ID'] = df['Customer ID'].astype(str)

# Missing columns (UniqueProducts, TenureDays) raw sales data se banao
df_sales = pd.read_csv('data/processed/online_retail_sales_cleaned.csv')
df_sales['InvoiceDate'] = pd.to_datetime(df_sales['InvoiceDate'])
df_sales['Customer ID'] = df_sales['Customer ID'].astype(str)

snapshot_date = df_sales['InvoiceDate'].max() + pd.Timedelta(days=1)

unique_products = df_sales.groupby('Customer ID')['StockCode'].nunique()
df['UniqueProducts'] = df['Customer ID'].map(unique_products)

first_purchase = df_sales.groupby('Customer ID')['InvoiceDate'].min()
tenure_series = (snapshot_date - first_purchase).dt.days
df['TenureDays'] = df['Customer ID'].map(tenure_series)

# Check karo koi NaN to nahi reh gaya
print("Nulls check:")
print(df[['AvgOrderValue', 'UniqueProducts', 'TenureDays']].isnull().sum())

# Ab database mein daalo
session = SessionLocal()

for _, row in df.iterrows():
    customer = Customer(
        id=row['Customer ID'],
        recency=int(row['Recency']),
        frequency=int(row['Frequency']),
        monetary=float(row['Monetary']),
        segment=row['Segment'],
        churned=int(row['Churned']),
        clv=float(row['CLV']),
        avg_order_value=float(row['AvgOrderValue']),
        unique_products=int(row['UniqueProducts']),
        tenure_days=int(row['TenureDays'])
    )
    session.add(customer)

session.commit()
print(f"{len(df)} customers added to database!")