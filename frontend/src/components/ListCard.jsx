function ListCard({ title, items, renderItem, getKey }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
            <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                    <li key={getKey(item)} className="py-2 text-gray-700">
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListCard;