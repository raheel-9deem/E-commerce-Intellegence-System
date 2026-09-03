# AI E-Commerce Intelligence Platform

An end-to-end analytics platform that turns raw e-commerce transaction data into actionable business intelligence. It segments customers, predicts churn risk, estimates customer lifetime value, recommends products, forecasts sales, flags anomalous transactions, and answers natural-language business questions through an AI analyst — all surfaced on an interactive dashboard.

---

## Progress

| Notebook | Status | What it does |
|---|---|---|
| `01_data_exploration.ipynb` | ✅ Done | Loaded and explored the raw dataset |
| `02_data_cleaning.ipynb` | ✅ Done | Removed missing/invalid rows, fixed data types, engineered `TotalPrice` |
| `03_eda.ipynb` | ✅ Done | Top products/customers, monthly sales trend, orders-per-customer distribution |
| `04_rfm_segmentation.ipynb` | ✅ Done | RFM analysis + K-Means clustering → 4 customer segments |
| `05_churn_prediction.ipynb` | ✅ Done | Feature engineering (AvgOrderValue, UniqueProducts, TenureDays), compared 6 classifiers, Random Forest selected (82% accuracy) |
| `06_clv.ipynb` | ✅ Done | Churn-rate-based estimated lifespan → formula-based CLV per customer |
| `07_recommendation.ipynb` | ✅ Done | Popularity-based + item-based collaborative filtering (cosine similarity) |
| `08_forecasting.ipynb` | ✅ Done | Prophet model — daily sales forecast, trend/weekly/yearly seasonality analyzed |
| `09_anomaly_detection.ipynb` | ✅ Done | Isolation Forest on invoice-level summaries — flagged large-volume/high-value wholesale orders |
| Backend (FastAPI) | 🟡 In progress | SQLite + SQLAlchemy `Customer` table (5,878 rows seeded); live endpoints for customer list/detail and churn prediction (see below) |
| Frontend (React) | ⬜ Not started | Dashboard |

### Backend — what's live so far

- **Database:** SQLite (`ecommerce.db`), via SQLAlchemy ORM — chosen for zero-setup local development; the ORM layer makes switching to PostgreSQL later a connection-string change, not a rewrite
- **`Customer` table:** `id`, `recency`, `frequency`, `monetary`, `segment`, `churned`, `clv`, `avg_order_value`, `unique_products`, `tenure_days` — seeded from the notebook outputs (`clv_results.csv` + engineered fields from the cleaned sales data)
- **Endpoints:**
  - `GET /` — health check
  - `GET /customers` — list customers (Pydantic `CustomerSchema` response model)
  - `GET /customers/{customer_id}` — single customer lookup
  - `GET /customers/{customer_id}/churn-prediction` — loads the saved `churn_model.pkl` (Random Forest) and returns a live churn prediction for that customer
- Interactive API docs auto-generated at `/docs`

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

## Dataset

Built on the **[Online Retail II](https://www.kaggle.com/datasets/mashlyn/online-retail-ii-uci)** dataset (UCI Machine Learning Repository) — ~1M transactions, ~5,900 customers, ~5,300 products, spanning Dec 2009–Dec 2011, across 43 countries. Customers in this dataset make repeat purchases, which makes it well suited for RFM segmentation, churn prediction, and CLV.

> **Note:** The [Olist Brazilian E-Commerce dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce) was also explored (as a 9-table relational dataset) purely as a learning exercise — to practice merging multiple related tables and to compare RFM results across a different business model (marketplace with a low repeat-purchase rate vs. a repeat-purchase retail store). It is **not** part of the actual build; only Online Retail II is used going forward.

---

## Tech Stack

**Backend:** Python, FastAPI, Pydantic, SQLAlchemy, SQLite (dev) → PostgreSQL-ready
**Data / ML:** Pandas, NumPy, Scikit-learn, Prophet, Isolation Forest, joblib
**AI:** LLM API (Claude) for natural-language business Q&A
**Frontend:** React, Tailwind CSS, Recharts / Plotly
**Tooling:** Jupyter Notebooks, Git/GitHub, Docker (optional)

---

## Project Structure

```
ai-ecommerce/
│
├── notebooks/                    # Exploratory & prototyping work
│   ├── 01_data_exploration.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_eda.ipynb
│   ├── 04_rfm_segmentation.ipynb
│   ├── 05_churn_prediction.ipynb
│   ├── 06_clv.ipynb
│   ├── 07_recommendation.ipynb
│   ├── 08_forecasting.ipynb
│   └── 09_anomaly_detection.ipynb
│
├── data/
│   ├── raw/                      # Original dataset
│   └── processed/                # Cleaned CSVs
│
├── backend/
│   ├── main.py                   # FastAPI app + routes
│   ├── create_tables.py          # Creates all tables from models
│   ├── seed_data.py              # Loads processed CSVs into the database
│   ├── api/                      # FastAPI route files (future: split out of main.py)
│   ├── models/                   # SQLAlchemy DB models (customer.py, ...)
│   ├── schemas/                  # Pydantic request/response schemas (customer.py, ...)
│   ├── services/                 # Business logic
│   └── core/                     # Config, DB connection (database.py)
│
├── ml/                           # Production ML modules (graduated from notebooks)
│   ├── customer_segmentation/
│   ├── churn_prediction/         # churn_model.pkl (Random Forest, 82% accuracy)
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

Built in 4 phases (3–3.5 hrs/day):

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
- PostgreSQL in production (SQLite used for local development; swap is a one-line connection-string change thanks to SQLAlchemy)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/raheel-9deem/E-commerce-intelligent-system.git
cd E-commerce-intelligence-System

# Set up a virtual environment
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Launch Jupyter for the notebook workflow
jupyter notebook

# --- Backend ---
# Create the database tables
python -m backend.create_tables

# Seed the database from the processed CSVs
python -m backend.seed_data

# Run the API server (auto-reloads on code changes)
uvicorn backend.main:app --reload
# Then open http://127.0.0.1:8000/docs for interactive API docs
```

---

## Author

**Raheel Nadeem**
[Website](https://raheelnadeem.online) · [LinkedIn](https://linkedin.com/in/raheel-nadeem) · [GitHub](https://github.com/raheel-9deem)