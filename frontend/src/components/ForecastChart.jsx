import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ForecastChart({ data }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7-Day Sales Forecast</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ds" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="yhat" stroke="#2563eb" strokeWidth={2} name="Predicted Sales" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ForecastChart;