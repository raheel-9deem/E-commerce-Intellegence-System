import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function TopCustomersBarChart({ data }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Top 5 Customers by CLV</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clv" fill="#16a34a" name="CLV" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TopCustomersBarChart;