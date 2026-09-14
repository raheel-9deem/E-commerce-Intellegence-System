function SearchBox({ label, placeholder, value, onChange, onSearch, buttonText = 'Search' }) {
    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded px-3 py-2 flex-1"
            />
            <button
                onClick={onSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {buttonText}
            </button>
        </div>
    );
}

export default SearchBox;