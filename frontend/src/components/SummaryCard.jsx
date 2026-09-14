function SummaryCard({ title, value, color = 'text-gray-800' }) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
    );
}

export default SummaryCard;