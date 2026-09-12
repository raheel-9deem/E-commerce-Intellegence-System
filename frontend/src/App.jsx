import { useState, useEffect } from 'react';

const BASE_URL = 'http://127.0.0.1:8000';

function App() {
  const [summary, setSummary] = useState(null);
  const [topCustomers, setTopCustomers] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard/summary`)
      .then((res) => res.json())
      .then((data) => setSummary(data));

    fetch(`${BASE_URL}/customers/top-clv?limit=5`)
      .then((res) => res.json())
      .then((data) => setTopCustomers(data));

    fetch(`${BASE_URL}/transactions/anomalies?limit=5`)
      .then((res) => res.json())
      .then((data) => setAnomalies(data));

    fetch(`${BASE_URL}/sales/forecast?days=7`)
      .then((res) => res.json())
      .then((data) => setForecast(data));
  }, []);

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Business Dashboard</h1>

      <h2>Summary</h2>
      <p>Total Customers: {summary.total_customers}</p>
      <p>Total Revenue: {summary.total_revenue}</p>
      <p>Average CLV: {summary.avg_clv}</p>
      <p>Churned Customers: {summary.churned_customers}</p>

      <h2>Top 5 Customers by CLV</h2>
      <ul>
        {topCustomers.map((customer) => (
          <li key={customer.id}>
            {customer.id} — {customer.segment} — CLV: {customer.clv}
          </li>
        ))}
      </ul>

      <h2>Flagged Anomalies</h2>
      <ul>
        {anomalies.map((item) => (
          <li key={item.Invoice}>
            Invoice {item.Invoice} — Amount: {item.TotalAmount}
          </li>
        ))}
      </ul>

      <h2>7-Day Sales Forecast</h2>
      <ul>
        {forecast.map((day) => (
          <li key={day.ds}>
            {day.ds} — Predicted: {day.yhat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;