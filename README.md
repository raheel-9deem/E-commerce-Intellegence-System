# E-Commerce Intelligent System

An end-to-end data science project built on the **Online Retail II** dataset — a real-world transactional dataset from a UK-based online retailer active between 2009 and 2011. The goal is to explore, clean, model, and derive actionable business intelligence from raw e-commerce data.

---

## Dataset

The dataset contains **1,067,371 transactions** across the following columns:

| Column       | Description                                      |
|--------------|--------------------------------------------------|
| Invoice      | Invoice number (unique per transaction)          |
| StockCode    | Product code                                     |
| Description  | Product name                                     |
| Quantity     | Number of units purchased                        |
| InvoiceDate  | Date and time of the transaction                 |
| Price        | Unit price (GBP)                                 |
| Customer ID  | Unique identifier for each customer              |
| Country      | Customer's country of residence                  |

> **Source:** [UCI Machine Learning Repository – Online Retail II](https://archive.ics.uci.edu/dataset/502/online+retail+ii)

---

## Project Structure

```
├── data/
│   ├── raw/
│   │   └── online_retail_II.csv          # Original dataset
│   └── processed/
│       ├── online_retail_sales_cleaned.csv  # Cleaned sales data
│       └── online_retail_returns.csv        # Cancelled / returned orders
├── notebooks/
│   ├── 01_data_exploration.ipynb         # Initial EDA & dataset overview
│   ├── 02_data_cleaning.ipynb            # Data cleaning & preprocessing
│   └── ...                               # Future: analysis, modeling, segmentation
├── requirements.txt
├── LICENSE
└── README.md
```

---

## Setup

### Prerequisites

- Python 3.10+
- pip (or `pip install -r requirements.txt`)

### Installation

```bash
git clone https://github.com/<your-username>/ecommerce-intelligent-system.git
cd ecommerce-intelligent-system
pip install -r requirements.txt
```

### Running the Notebooks

```bash
jupyter lab         # or: jupyter notebook
```

---

## Notebooks

| # | Notebook | Purpose |
|---|----------|---------|
| 01 | `01_data_exploration.ipynb` | Load dataset, inspect shape, dtypes, summary stats, head/tail previews |
| 02 | `02_data_cleaning.ipynb` | Handle missing values, remove negatives/zero-prices, separate sales vs returns, compute `TotalPrice`, save cleaned CSVs |
| *03* | *(upcoming)* | RFM customer segmentation, cohort analysis |
| *04* | *(upcoming)* | Predictive modeling — demand forecasting, churn, return-risk |
| *05* | *(upcoming)* | Streamlit dashboard for business stakeholders |

---

## Tech Stack

| Library          | Role                                   |
|------------------|----------------------------------------|
| pandas           | Data manipulation & preprocessing      |
| numpy            | Numerical operations                   |
| scikit-learn     | ML models & preprocessing              |
| matplotlib       | Static visualizations                  |
| seaborn          | Statistical plots                      |
| statsmodels      | Time-series & statistical modeling     |
| plotly           | Interactive charts & dashboards        |
| jupyter / jupyterlab | Interactive notebook environment  |
| scipy            | Scientific computing utilities         |

---

## Planned Analyses

1. **Exploratory Data Analysis** — sales trends, top products, country breakdowns
2. **RFM Segmentation** — Recency, Frequency, Monetary customer groups
3. **Cohort Analysis** — retention curves, customer lifecycle
4. **Predictive Modeling** — demand forecasting, return likelihood
5. **Interactive Dashboard** — Streamlit app for non-technical stakeholders

---

## License

MIT — see [LICENSE](LICENSE) for details.
