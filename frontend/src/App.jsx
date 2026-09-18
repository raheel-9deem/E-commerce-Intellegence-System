import { useState, useEffect } from 'react';
import SummaryCard from './components/SummaryCard';
import SearchBox from './components/SearchBox';
import ListCard from './components/ListCard';
import ForecastChart from './components/ForecastChart';
import SegmentPieChart from './components/SegmentPieChart';
import TopCustomersBarChart from './components/TopCustomersBarChart';

const BASE_URL = 'http://127.0.0.1:8000';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState(null);
  const [topCustomers, setTopCustomers] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [forecastDays, setForecastDays] = useState('7');
  const [customerId, setCustomerId] = useState('');
  const [customerResult, setCustomerResult] = useState(null);
  const [churnResult, setChurnResult] = useState(null);
  const [productName, setProductName] = useState('');
  const [similarProducts, setSimilarProducts] = useState(null);
  const [segmentName, setSegmentName] = useState('');
  const [segmentCustomers, setSegmentCustomers] = useState(null);
  const [demandProduct, setDemandProduct] = useState('');
  const [demandResult, setDemandResult] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  function fetchForecast() {
    fetch(`${BASE_URL}/sales/forecast?days=${forecastDays}`)
      .then((res) => res.json())
      .then((data) => setForecast(data));
  }

  function askAI() {
    setAiLoading(true);
    fetch(`${BASE_URL}/ai/ask?question=${encodeURIComponent(aiQuestion)}`)
      .then((res) => res.json())
      .then((data) => {
        setAiAnswer(data.answer);
        setAiLoading(false);
      });
  }

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

    fetchForecast();
  }, []);

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

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded ${activeTab === 'customers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Customers
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Products
        </button>

        <button
          onClick={() => setActiveTab('sales')}
          className={`px-4 py-2 rounded ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Sales
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 rounded ${activeTab === 'ai' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        >
          AI Analyst
        </button>

      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <SummaryCard title="Total Customers" value={summary.total_customers} />
            <SummaryCard title="Total Revenue" value={summary.total_revenue} />
            <SummaryCard title="Average CLV" value={summary.avg_clv} />
            <SummaryCard title="Churned Customers" value={summary.churned_customers} color="text-red-500" />
          </div>
          <SegmentPieChart data={summary.segment_breakdown} />
        </>
      )}

      {/* CUSTOMERS TAB */}
      {activeTab === 'customers' && (
        <>
          <TopCustomersBarChart data={topCustomers} />

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Search Customer</h2>
            <SearchBox
              placeholder="Enter Customer ID (e.g. 12346)"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              onSearch={searchCustomer}
            />
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

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Filter Customers by Segment</h2>
            <SearchBox
              placeholder="e.g. VIP, Regular, At Risk"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              onSearch={searchSegment}
              buttonText="Filter"
            />
            {segmentCustomers && (
              <ListCard
                title="Segment Results"
                items={segmentCustomers || []}
                getKey={(customer) => customer.id}
                renderItem={(customer) => `${customer.id} — CLV: ${customer.clv}`}
              />
            )}
          </div>
        </>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Find Similar Products</h2>
            <SearchBox
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onSearch={searchProduct}
            />
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

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Demand Forecast</h2>
            <SearchBox
              placeholder="Enter Product Name"
              value={demandProduct}
              onChange={(e) => setDemandProduct(e.target.value)}
              onSearch={searchDemand}
              buttonText="Forecast"
            />
            {demandResult && (
              <div className="text-gray-700 space-y-1">
                <p>Avg Daily Demand: {demandResult.avg_daily_demand}</p>
                <p>Forecasted Demand ({demandResult.forecast_period_days} days): {demandResult.forecasted_demand}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* SALES TAB */}
      {activeTab === 'sales' && (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Sales Forecast</h2>
            <SearchBox
              placeholder="Kitne din ka forecast? (e.g. 30)"
              value={forecastDays}
              onChange={(e) => setForecastDays(e.target.value)}
              onSearch={fetchForecast}
              buttonText="Update Forecast"
            />
            <ForecastChart data={forecast} />
          </div>

          <ListCard
            title="Flagged Anomalies"
            items={anomalies}
            getKey={(item) => item.Invoice}
            renderItem={(item) => `Invoice ${item.Invoice} — Amount: ${item.TotalAmount}`}
          />
        </>
      )}

      {/* AI ANALYST TAB */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Ask Your Business Data</h2>
          <SearchBox
            placeholder="e.g. Top product kaunsa hai?"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            onSearch={askAI}
            buttonText="Analyze"
          />

          {aiLoading && <p className="text-gray-500">Analyzing...</p>}

          {aiAnswer && !aiLoading && (
            <div className="mt-4 p-4 bg-blue-50 rounded text-gray-800 whitespace-pre-line">
              {aiAnswer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;