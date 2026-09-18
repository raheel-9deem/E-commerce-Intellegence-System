import pandas as pd

df_sales = pd.read_csv('data/processed/online_retail_sales_cleaned.csv')

def get_top_product_stats():
    top_product = df_sales.groupby('Description')['TotalPrice'].sum().sort_values(ascending=False).head(1)
    product_name = top_product.index[0]
    revenue = top_product.values[0]
    return f"Top product: {product_name}, Revenue: ${revenue:,.2f}"

def get_monthly_sales_stats():
    df_sales['InvoiceDate'] = pd.to_datetime(df_sales['InvoiceDate'])
    df_sales['YearMonth'] = df_sales['InvoiceDate'].dt.to_period('M')
    monthly = df_sales.groupby('YearMonth')['TotalPrice'].sum()
    latest_month = monthly.index[-1]
    latest_revenue = monthly.values[-1]
    prev_revenue = monthly.values[-2]
    change_pct = ((latest_revenue - prev_revenue) / prev_revenue) * 100
    return (
        f"Latest month ({latest_month}): ${latest_revenue:,.2f} revenue, "
        f"{change_pct:+.1f}% vs previous month "
        f"(Note: {latest_month} data may be incomplete — dataset ends early in this month)"
    )


def get_segment_stats():
    rfm = pd.read_csv('data/processed/clv_results.csv')
    segment_summary = rfm.groupby('Segment')['CLV'].agg(['count', 'mean'])
    segment_summary = segment_summary.sort_values('mean', ascending=False)
    top_segment = segment_summary.index[0]
    count = segment_summary['count'].iloc[0]
    avg_clv = segment_summary['mean'].iloc[0]
    return f"Most valuable segment: {top_segment} ({count} customers), Average CLV: ${avg_clv:,.2f}"