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
  const [demandProduct, setDemandProduct] = useState('');
  const [demandResult, setDemandResult] = useState(null);

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

  function searchDemand() {
    fetch(`${BASE_URL}/products/${demandProduct}/demand-forecast`)
      .then((res) => res.json())
      .then((data) => setDemandResult(data));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-800">{summary.total_customers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">{summary.total_revenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Average CLV</p>
          <p className="text-2xl font-bold text-gray-800">{summary.avg_clv}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Churned Customers</p>
          <p className="text-2xl font-bold text-red-500">{summary.churned_customers}</p>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Top 5 Customers by CLV</h2>
        <ul className="divide-y divide-gray-200">
          {topCustomers.map((customer) => (
            <li key={customer.id} className="py-2 text-gray-700">
              {customer.id} — {customer.segment} — CLV: {customer.clv}
            </li>
          ))}
        </ul>
      </div>

      {/* Customer Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Search Customer</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter Customer ID (e.g. 12346)"
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />
          <button
            onClick={searchCustomer}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {customerResult && (
          <div className="text-gray-700 space-y-1">
            <p>Segment: {customerResult.segment}</p>
            <p>CLV: {customerResult.clv}</p>
            <p>Recency: {customerResult.recency}</p>
            <p>Frequency: {customerResult.frequency}</p>
          </div>
        )}

        {churnResult && (
          <p className="mt-2 font-semibold">
            Will Churn: <span className={churnResult.will_churn ? 'text-red-500' : 'text-green-600'}>
              {churnResult.will_churn ? 'Yes' : 'No'}
            </span>
          </p>
        )}
      </div>

      {/* Product Recommendation Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Find Similar Products</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter Product Name"
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />
          <button
            onClick={searchProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {similarProducts && (
          <ul className="divide-y divide-gray-200">
            {Object.entries(similarProducts).map(([name, score]) => (
              <li key={name} className="py-2 text-gray-700">
                {name} — Similarity: {score.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Segment Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Filter Customers by Segment</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="e.g. VIP, Regular, At Risk"
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />
          <button
            onClick={searchSegment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Filter
          </button>
        </div>

        {segmentCustomers && (
          <ul className="divide-y divide-gray-200">
            {segmentCustomers.map((customer) => (
              <li key={customer.id} className="py-2 text-gray-700">
                {customer.id} — CLV: {customer.clv}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Demand Forecast */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Demand Forecast</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={demandProduct}
            onChange={(e) => setDemandProduct(e.target.value)}
            placeholder="Enter Product Name"
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />
          <button
            onClick={searchDemand}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Forecast
          </button>
        </div>

        {demandResult && (
          <div className="text-gray-700 space-y-1">
            <p>Avg Daily Demand: {demandResult.avg_daily_demand}</p>
            <p>Forecasted Demand ({demandResult.forecast_period_days} days): {demandResult.forecasted_demand}</p>
          </div>
        )}
      </div>

      {/* Anomalies */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Flagged Anomalies</h2>
        <ul className="divide-y divide-gray-200">
          {anomalies.map((item) => (
            <li key={item.Invoice} className="py-2 text-gray-700">
              Invoice {item.Invoice} — Amount: {item.TotalAmount}
            </li>
          ))}
        </ul>
      </div>

      {/* Forecast */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">7-Day Sales Forecast</h2>
        <ul className="divide-y divide-gray-200">
          {forecast.map((day) => (
            <li key={day.ds} className="py-2 text-gray-700">
              {day.ds} — Predicted: {day.yhat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;