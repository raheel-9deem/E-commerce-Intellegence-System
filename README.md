# AI E-Commerce Intelligence Platform

An end-to-end analytics platform that turns raw e-commerce transaction data into actionable business intelligence. It segments customers, predicts churn risk, estimates customer lifetime value, recommends products, forecasts sales, flags anomalous transactions, and answers natural-language business questions through an AI analyst — all surfaced on an interactive dashboard.

---

## Features

| Module | What it does |
|---|---|
| **Customer Segmentation** | RFM analysis + K-Means clustering to group customers into VIP / Regular / Occasional / At Risk |
| **Churn Prediction** | Logistic Regression / Random Forest model to flag customers likely to stop purchasing |
| **Customer Lifetime Value (CLV)** | Formula-based estimate of future customer value |
| **Product Recommendations** | Popularity-based + item-based collaborative filtering |
| **Sales Forecasting** | Prophet time-series model to predict future revenue |
| **Demand Prediction** | Per-product forecast for top-selling items |
| **Anomaly Detection** | Isolation Forest to flag suspicious/unusual transactions |
| **AI Business Analyst** | Natural-language Q&A over business metrics, powered by an LLM |
| **Executive Dashboard** | React + Tailwind dashboard visualizing all of the above |

---

## Datasets

Raw data lives in `data/raw/` and holds two source datasets:

### 1. Online Retail II — *primary (in use)*
The **[Online Retail II](https://www.kaggle.com/datasets/mashlyn/online-retail-ii-uci)** dataset (UCI Machine Learning Repository) — ~1M transactions, ~5,900 customers, ~5,300 products, spanning Dec 2009–Dec 2011, across 43 countries. This is the dataset the current notebooks (01–04) clean, explore, and segment.

- `online_retail_II.csv`

### 2. Olist Brazilian E-Commerce — *available (not yet used)*
The **[Olist Brazilian E-Commerce Public Dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)** — ~100k orders (2016–2018) with customers, items, payments, reviews, sellers, geolocation, and product metadata across relational tables:

- `olist_customers_dataset.csv`
- `olist_geolocation_dataset.csv`
- `olist_order_items_dataset.csv`
- `olist_order_payments_dataset.csv`
- `olist_order_reviews_dataset.csv`
- `olist_orders_dataset.csv`
- `olist_products_dataset.csv`
- `olist_sellers_dataset.csv`
- `product_category_name_translation.csv`

---

## Current Progress

The project is being built in phases. Status as of the latest commit:

| Stage | Status |
|---|---|
| Data loading & inspection (`01`) | ✅ Done |
| Data cleaning — split sales vs. returns, handle nulls/duplicates (`02`) | ✅ Done |
| Exploratory data analysis — top products, customers, monthly trend, country revenue (`03`) | ✅ Done |
| RFM feature engineering + K-Means segmentation into 4 segments (`04`) | ✅ Done |
| Churn prediction, CLV, recommendations | ⏳ Next |
| Forecasting, anomaly detection | ⏳ Planned |
| Backend API, AI analyst, dashboard | ⏳ Planned |

**Segments produced so far** (from `data/processed/rfm_segments.csv`): `VIP`, `Regular`, `At Risk`, `Key Accounts (Wholesale/Bulk)`.

---

## Tech Stack

**Backend:** Python, FastAPI, Pydantic, SQLAlchemy, PostgreSQL
**Data / ML:** Pandas, NumPy, Scikit-learn, Prophet, Isolation Forest
**AI:** LLM API (Claude) for natural-language business Q&A
**Frontend:** React, Tailwind CSS, Recharts / Plotly
**Tooling:** Jupyter Notebooks, Git/GitHub, Docker (optional)

---

## Project Structure

```
ai-ecommerce/
│
├── notebooks/                          # Exploratory & prototyping work
│   ├── 01_data_exploration.ipynb       # ✅ done
│   ├── 02_data_cleaning.ipynb          # ✅ done
│   ├── 03_eda_ipynb.ipynb              # ✅ done
│   ├── 04_RFM_K_Mean_Clustring.ipynb  # ✅ done — RFM + K-Means segmentation
│   ├── 05_churn_prediction.ipynb       # ⏳ planned
│   ├── 06_recommendation.ipynb         # ⏳ planned
│   ├── 07_forecasting.ipynb            # ⏳ planned
│   └── 08_anomaly_detection.ipynb      # ⏳ planned
│
├── data/
│   ├── raw/                            # Original datasets (unmodified)
│   │   ├── online_retail_II.csv            # UCI Online Retail II — used by notebooks 01–04
│   │   └── olist_*.csv (+ translation)     # Olist Brazilian E-Commerce set (9 files, see below)
│   └── processed/                      # Cleaned CSVs
│       ├── online_retail_sales_cleaned.csv
│       ├── online_retail_returns.csv
│       └── rfm_segments.csv            # RFM features + cluster segment per customer
│
├── backend/
│   ├── api/                      # FastAPI route files
│   ├── models/                   # SQLAlchemy DB models
│   ├── schemas/                  # Pydantic request/response schemas
│   ├── services/                 # Business logic
│   └── core/                     # Config, DB connection
│
├── ml/                           # Production ML modules (graduated from notebooks)
│   ├── customer_segmentation/
│   ├── churn_prediction/
│   ├── recommendation/
│   ├── forecasting/
│   └── anomaly_detection/
│
├── ai/
│   ├── query_templates/          # Predefined question → stat mappings
│   └── llm_client/               # LLM API wrapper for natural-language answers
│
├── frontend/                     # React + Tailwind dashboard
│
├── database/                     # Migrations / seed scripts
│
├── tests/
│
├── docker/                       # Optional containerization
│
└── requirements.txt
```

---

## Development Workflow

Every ML feature follows the same four-step cycle:

1. **Notebook** — prototype fast, explore data, try models, validate results
2. **Module** — graduate the working logic into a clean function/class under `ml/`
3. **API** — expose it through a FastAPI endpoint
4. **Frontend** — surface it on the dashboard

---

## Roadmap

Built in 4 phases over ~24 days (3–3.5 hrs/day):

- **Phase 1 — Foundation + Customer Intelligence:** Data cleaning, EDA, RFM segmentation, backend skeleton
- **Phase 2 — Predictive Intelligence:** Churn prediction, CLV, product recommendations
- **Phase 3 — Forecasting & Anomaly Detection:** Sales forecasting, demand prediction, anomaly detection
- **Phase 4 — AI Analyst + Dashboard:** Natural-language business Q&A, full dashboard, deployment

### Not in scope for this build (future work)
- RAG with a vector database (using template-based Q&A + LLM phrasing instead)
- Multi-model forecast comparison (Prophet only for now)
- Deep learning models (PyTorch)
- Full BG/NBD CLV model (using formula-based CLV instead)
- Hybrid recommendation engine (popularity + collaborative filtering only)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/raheel-9deem/E-commerce-Intellegence-System.git
cd "E-commerece Intellegent System"

# Set up a virtual environment
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Launch Jupyter for the notebook workflow
jupyter notebook
```

---

## Author

**Raheel Nadeem**
[Website](https://raheelnadeem.online) · [LinkedIn](https://linkedin.com/in/raheel-nadeem) · [GitHub](https://github.com/raheel-9deem)
