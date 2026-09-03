import pandas as pd
df = pd.read_csv('data/processed/clv_results.csv')
print(df.columns.tolist())
print(df.head())