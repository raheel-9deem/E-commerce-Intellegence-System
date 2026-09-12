import { useState, useEffect } from 'react';

function App() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/dashboard/summary')
      .then((response) => response.json())
      .then((data) => setSummary(data));
  }, []);

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Business Dashboard</h1>
      <p>Total Customers: {summary.total_customers}</p>
      <p>Total Revenue: {summary.total_revenue}</p>
      <p>Average CLV: {summary.avg_clv}</p>
      <p>Churned Customers: {summary.churned_customers}</p>
    </div>
  );
}

export default App;