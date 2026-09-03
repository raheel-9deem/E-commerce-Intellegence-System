# AI E-Commerce Intelligence Platform

An end-to-end analytics platform that turns raw e-commerce transaction data into actionable business intelligence. It segments customers, predicts churn risk, estimates customer lifetime value, recommends products, forecasts sales, flags anomalous transactions, and (eventually) answers natural-language business questions through an AI analyst — all surfaced on an interactive dashboard.

This README is written so a new contributor (or a future version of the author) can understand the project, set it up from scratch, and know exactly where things stand, without needing to ask.

---

## Table of Contents

1. [What This Project Does](#what-this-project-does)
2. [Dataset](#dataset)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [Current Progress](#current-progress)
7. [Getting Started (Setup From Scratch)](#getting-started-setup-from-scratch)
8. [Running the Backend](#running-the-backend)
9. [API Endpoints (So Far)](#api-endpoints-so-far)
10. [Troubleshooting](#troubleshooting)
11. [Roadmap](#roadmap)
12. [What's Deliberately Out of Scope](#whats-deliberately-out-of-scope)
13. [Author](#author)

---

## What This Project Does

| Module | What it does |
|---|---|
| **Customer Segmentation** | RFM analysis (Recency, Frequency, Monetary) + K-Means clustering to group customers into VIP / Regular / At Risk / Key Accounts |
| **Churn Prediction** | Classification model (Random Forest) to flag customers likely to stop purchasing |
| **Customer Lifetime Value (CLV)** | Formula-based estimate of future customer value, using churn-rate-derived lifespan |
| **Product Recommendations** | Popularity-based + item-based collaborative filtering (cosine similarity) |
| **Sales Forecasting** | Prophet time-series model to predict future daily revenue, with trend/seasonality breakdown |
| **Anomaly Detection** | Isolation Forest to flag unusual invoices (e.g. abnormally large or high-value orders) |
| **AI Business Analyst** *(planned)* | Natural-language Q&A over business metrics, powered by an LLM |
| **Executive Dashboard** *(planned)* | React + Tailwind dashboard visualizing all of the above |

---

## Dataset

Built on the **[Online Retail II](https://www.kaggle.com/datasets/mashlyn/online-retail-ii-uci)** dataset (UCI Machine Learning Repository) — roughly 1 million transactions, ~5,900 customers, ~5,300 products, spanning December 2009 to December 2011, across 43 countries. Customers in this dataset make repeat purchases, which is what makes it well suited for RFM segmentation, churn prediction, and CLV (a dataset where everyone buys exactly once can't support any of those).

> **Note on the Olist dataset:** The [Olist Brazilian E-Commerce dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce) (a 9-table relational dataset) was explored separately, purely as a learning exercise — to practice merging multiple related tables and to compare RFM results across a different business model (a marketplace with a low repeat-purchase rate vs. a repeat-purchase retail store). **It is not part of the actual build.** Only Online Retail II is used going forward. If you see references to Olist in old notebooks or commit history, that's why.

Place the raw CSV at `data/raw/online_retail_II.csv` before running the notebooks.

---

## Tech Stack

**Backend:** Python, FastAPI, Pydantic, SQLAlchemy, SQLite (development) → PostgreSQL-ready for production
**Data / ML:** Pandas, NumPy, Scikit-learn, Prophet, Isolation Forest, joblib
**AI (planned):** LLM API (Claude) for natural-language business Q&A
**Frontend (planned):** React, Tailwind CSS, Recharts / Plotly
**Tooling:** Jupyter Notebooks, Git/GitHub, Docker (optional, not yet used)

---

## Project Structure

```
ai-ecommerce/
│
├── notebooks/                    # Exploratory & prototyping work — start here to understand the ML logic
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
│   ├── raw/                      # Original dataset (online_retail_II.csv goes here)
│   └── processed/                # Cleaned/derived CSVs produced by the notebooks
│
├── backend/
│   ├── main.py                   # FastAPI app + route definitions
│   ├── create_tables.py          # Creates all tables from the SQLAlchemy models
│   ├── seed_data.py              # Loads the processed CSVs into the database
│   ├── api/                      # Route files (routes currently live in main.py; will be split out here)
│   ├── models/                   # SQLAlchemy DB models (customer.py, ...)
│   ├── schemas/                  # Pydantic request/response schemas (customer.py, ...)
│   ├── services/                 # Business logic layer
│   └── core/                     # Config and DB connection (database.py)
│
├── ml/                           # Production ML modules — the "graduated" version of notebook logic
│   ├── customer_segmentation/
│   ├── churn_prediction/         # churn_model.pkl (Random Forest, ~82% test accuracy)
│   ├── recommendation/
│   ├── forecasting/
│   └── anomaly_detection/
│
├── ai/                           # Planned: AI Business Analyst
│   ├── query_templates/          # Predefined question → stat mappings
│   └── llm_client/               # LLM API wrapper for natural-language answers
│
├── frontend/                     # Planned: React + Tailwind dashboard
│
├── database/                     # Migrations / seed scripts (reserved; seeding currently lives in backend/seed_data.py)
│
├── tests/                        # Reserved for future test coverage
│
├── docker/                       # Optional containerization (not yet used)
│
└── requirements.txt
```

---

## Development Workflow

Every ML feature in this project follows the same four-step cycle, in order:

1. **Notebook** — prototype fast: explore the data, try approaches, validate results visually
2. **Module** — once a notebook approach works, the logic is "graduated" into a clean, reusable function/class under `ml/`
3. **API** — the module is exposed through a FastAPI endpoint in `backend/`
4. **Frontend** — the endpoint's data is surfaced on the dashboard

This means the notebooks aren't just scratch work to throw away — they're the design phase for everything that gets built afterward. If a backend endpoint's logic seems unclear, the matching notebook almost always explains the "why" behind it.

---

## Current Progress

| Component | Status | Notes |
|---|---|---|
| `01_data_exploration.ipynb` | ✅ Done | Loaded and explored the raw dataset |
| `02_data_cleaning.ipynb` | ✅ Done | Removed missing/invalid rows, fixed data types, engineered `TotalPrice` |
| `03_eda.ipynb` | ✅ Done | Top products/customers, monthly sales trend, orders-per-customer distribution |
| `04_rfm_segmentation.ipynb` | ✅ Done | RFM analysis + K-Means clustering → 4 customer segments |
| `05_churn_prediction.ipynb` | ✅ Done | Feature engineering (AvgOrderValue, UniqueProducts, TenureDays), compared 6 classifiers, Random Forest selected (~82% test accuracy) |
| `06_clv.ipynb` | ✅ Done | Churn-rate-based estimated lifespan → formula-based CLV per customer |
| `07_recommendation.ipynb` | ✅ Done | Popularity-based + item-based collaborative filtering (cosine similarity) |
| `08_forecasting.ipynb` | ✅ Done | Prophet model — daily sales forecast, trend/weekly/yearly seasonality analyzed |
| `09_anomaly_detection.ipynb` | ✅ Done | Isolation Forest on invoice-level summaries — flagged large-volume/high-value wholesale-style orders |
| Backend (FastAPI) | 🟡 In progress | See below |
| Frontend (React) | ⬜ Not started | |
| AI Business Analyst | ⬜ Not started | |

### Backend — what's live right now

- **Database:** SQLite (`ecommerce.db`) via the SQLAlchemy ORM. SQLite was chosen for zero-setup local development; because SQLAlchemy abstracts the database layer, moving to PostgreSQL later is a one-line connection-string change in `backend/core/database.py`, not a rewrite.
- **`Customer` table** (`backend/models/customer.py`): `id`, `recency`, `frequency`, `monetary`, `segment`, `churned`, `clv`, `avg_order_value`, `unique_products`, `tenure_days`. Seeded with all 5,878 customers from `data/processed/clv_results.csv`, with `unique_products` and `tenure_days` re-derived from the cleaned sales data at seed time (they weren't present in the CLV CSV — see `backend/seed_data.py` for how they're computed).
- **Live endpoints:**
  - `GET /` — health check
  - `GET /customers` — list customers (returns a `List[CustomerSchema]`)
  - `GET /customers/{customer_id}` — look up a single customer
  - `GET /customers/{customer_id}/churn-prediction` — loads `ml/churn_prediction/churn_model.pkl` and returns a live churn prediction for that customer
- Interactive, auto-generated API docs are available at `/docs` once the server is running.

---

## Getting Started (Setup From Scratch)

### 1. Prerequisites

- **Python 3.11 or 3.12 is recommended.** Very new Python releases (e.g. 3.14) can lag behind on pre-built packages for some data-science libraries, which forces `pip` to compile from source — this fails on Windows without extra build tools. If you're on Python 3.13+ and hit install errors, see [Troubleshooting](#troubleshooting) below rather than downgrading Python — it's usually fixable by loosening version pins in `requirements.txt`.
- Git

### 2. Clone the Repo

```bash
git clone https://github.com/raheel-9deem/E-commerce-intelligent-system.git
cd E-commerce-intelligent-system
```

### 3. Create and Activate a Virtual Environment

```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows (PowerShell)
py -m venv venv
venv\Scripts\activate
```

If you have multiple Python versions installed on Windows, target a specific one with the `py` launcher, e.g. `py -3.11 -m venv venv`.

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Get the Dataset

Download [Online Retail II](https://www.kaggle.com/datasets/mashlyn/online-retail-ii-uci) from Kaggle and place the CSV at:

```
data/raw/online_retail_II.csv
```

### 6. Run the Notebooks (Optional, to Regenerate Processed Data)

```bash
jupyter notebook
```

Run `notebooks/01` through `09` in order. Each one reads from `data/raw/` or `data/processed/` and writes its output back to `data/processed/` — later notebooks depend on earlier ones having been run first.

> If you already have the processed CSVs (`data/processed/*.csv`) and the trained model (`ml/churn_prediction/churn_model.pkl`), you can skip straight to the backend setup below.

---

## Running the Backend

```bash
# 1. Create the database tables (creates ecommerce.db)
python -m backend.create_tables

# 2. Seed the database from the processed CSVs
python -m backend.seed_data

# 3. Start the API server (auto-reloads on code changes)
uvicorn backend.main:app --reload
```

Once running, open:

- `http://127.0.0.1:8000/` — health check
- `http://127.0.0.1:8000/docs` — interactive API documentation (Swagger UI) — the easiest way to explore and test every endpoint

If you change the `Customer` model's columns, the database schema does **not** update automatically — delete `ecommerce.db` and re-run steps 1 and 2.

---

## API Endpoints (So Far)

| Method | Path | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/customers` | List customers (first 10, per `CustomerSchema`) |
| GET | `/customers/{customer_id}` | Get a single customer by ID |
| GET | `/customers/{customer_id}/churn-prediction` | Predict churn (`true`/`false`) for a customer using the saved Random Forest model |

More endpoints (segment filtering, recommendations, forecast, anomalies) are planned as the backend phase continues — see [Roadmap](#roadmap).

---

## Troubleshooting

**`pip install` fails trying to build `pandas` from source (Windows, `meson`/`vswhere.exe` errors)**
This happens when `requirements.txt` pins an exact pandas version (e.g. `pandas==2.2.2`) that has no pre-built wheel for your Python version — pip falls back to compiling from source, which needs Visual C++ build tools you likely don't have. Fix: use minimum-version pins instead of exact ones (e.g. `pandas>=2.3.3`, which is the first pandas release with official Python 3.14 wheels), so pip can resolve to a version that has a pre-built wheel. This repo's `requirements.txt` already uses `>=` pins for this reason.

**`ModuleNotFoundError` when running a backend script**
Run backend scripts as modules from the project root, not as bare file paths:
```bash
python -m backend.create_tables      # correct
python backend/create_tables.py      # will break the internal imports
```

**`InconsistentVersionWarning` when the server loads `churn_model.pkl`**
This means the model was trained/saved with a different scikit-learn version than the one currently installed (e.g. trained in Google Colab, run locally). It's a warning, not an error — the app will generally still work. If predictions look wrong, install the matching scikit-learn version the model was trained with.

**`python` command not found on Windows, but you know Python is installed**
Windows' "App execution alias" can intercept the `python` command. Use the `py` launcher instead: `py --version`, `py -0` (lists all installed versions), `py -3.11 -m venv venv`.

---

## Roadmap

Originally scoped as a 4-phase build (3–3.5 hrs/day):

- **Phase 1 — Foundation + Customer Intelligence:** Data cleaning, EDA, RFM segmentation, backend skeleton *(done)*
- **Phase 2 — Predictive Intelligence:** Churn prediction, CLV, product recommendations *(notebooks done; backend in progress)*
- **Phase 3 — Forecasting & Anomaly Detection:** Sales forecasting, anomaly detection *(notebooks done)*
- **Phase 4 — AI Analyst + Dashboard:** Natural-language business Q&A, full dashboard, deployment *(not started)*

---

## What's Deliberately Out of Scope

These were consciously cut or simplified to fit the project's timeline — not oversights:

- **RAG with a vector database** — using template-based Q&A + LLM phrasing instead, for the planned AI Business Analyst
- **Multi-model forecast comparison** — Prophet only; XGBoost/LSTM comparison was scoped out
- **Deep learning models (PyTorch)** — not used anywhere in this build
- **Full BG/NBD CLV model** — a formula-based CLV (`AvgOrderValue × Frequency × Estimated Lifespan`) is used instead
- **Hybrid recommendation engine** — popularity-based + item-based collaborative filtering only, no content-based or deep-learning recommenders
- **PostgreSQL in production** — SQLite is used for local development; the swap is a one-line change thanks to SQLAlchemy, but hasn't been done yet

---

## Author

**Raheel Nadeem**
[Website](https://raheelnadeem.online) · [LinkedIn](https://linkedin.com/in/raheel-nadeem) · [GitHub](https://github.com/raheel-9deem)