import { useState, useEffect } from 'react';

const BASE_URL = 'http://127.0.0.1:8000';

function App() {
  const [summary, setSummary] = useState(null);
  const [topCustomers, setTopCustomers] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [customerResult, setCustomerResult] = useState(null);
  const [churnResult, setChurnResult] = useState(null);
  const [productName, setProductName] = useState('');
  const [similarProducts, setSimilarProducts] = useState(null);
  const [segmentName, setSegmentName] = useState('');
  const [segmentCustomers, setSegmentCustomers] = useState(null);

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

  function searchCustomer() {
    fetch(`${BASE_URL}/customers/${customerId}`)
      .then((res) => res.json())
      .then((data) => setCustomerResult(data));

    fetch(`${BASE_URL}/customers/${customerId}/churn-prediction`)
      .then((res) => res.json())
      .then((data) => setChurnResult(data));
  }

  function searchProduct() {
    fetch(`${BASE_URL}/products/${productName}/similar`)
      .then((res) => res.json())
      .then((data) => setSimilarProducts(data));
  }

  function searchSegment() {
    fetch(`${BASE_URL}/customers/segment/${segmentName}`)
      .then((res) => res.json())
      .then((data) => setSegmentCustomers(data));
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Business Dashboard</h1>

      <h2>Search Customer</h2>
      <input
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Enter Customer ID (e.g. 12346)"
      />
      <button onClick={searchCustomer}>Search</button>

      {customerResult && (
        <div>
          <p>Segment: {customerResult.segment}</p>
          <p>CLV: {customerResult.clv}</p>
          <p>Recency: {customerResult.recency}</p>
          <p>Frequency: {customerResult.frequency}</p>
        </div>
      )}

      {churnResult && (
        <p>Will Churn: {churnResult.will_churn ? 'Yes' : 'No'}</p>
      )}

      <h2>Find Similar Products</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter Product Name (e.g. WHITE HANGING HEART T-LIGHT HOLDER)"
      />
      <button onClick={searchProduct}>Search</button>

      {similarProducts && (
        <ul>
          {Object.entries(similarProducts).map(([name, score]) => (
            <li key={name}>{name} — Similarity: {score.toFixed(2)}</li>
          ))}
        </ul>
      )}

      <h2>Filter Customers by Segment</h2>
      <input
        type="text"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
        placeholder="e.g. VIP, Regular, At Risk"
      />
      <button onClick={searchSegment}>Filter</button>

      {segmentCustomers && (
        <ul>
          {segmentCustomers.map((customer) => (
            <li key={customer.id}>{customer.id} — CLV: {customer.clv}</li>
          ))}
        </ul>
      )}

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