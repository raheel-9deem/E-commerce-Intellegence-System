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

## Dataset

Built on the **[Online Retail II](https://www.kaggle.com/datasets/mashlyn/online-retail-ii-uci)** dataset (UCI Machine Learning Repository) — ~1M transactions, ~5,900 customers, ~5,300 products, spanning Dec 2009–Dec 2011, across 43 countries.

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
├── notebooks/                    # Exploratory & prototyping work
│   ├── 01_data_exploration.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_eda.ipynb
│   ├── 04_rfm_segmentation.ipynb
│   ├── 05_churn_prediction.ipynb
│   ├── 06_recommendation.ipynb
│   ├── 07_forecasting.ipynb
│   └── 08_anomaly_detection.ipynb
│
├── data/
│   ├── raw/                      # Original dataset
│   └── processed/                # Cleaned CSVs
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
git clone https://github.com/<your-username>/ai-ecommerce-intelligence-platform.git
cd ai-ecommerce-intelligence-platform

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
