const Search = ({ searchTerm, setSearchTerm, handleSearch, clearSearch }) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="flex relative items-center w-full lg:w-2/5">
                {searchTerm && (
                    <button className='absolute left-0 top-10 uppercase text-xs bg-sky-500 text-white px-3 py-1 font-bold' onClick={clearSearch}>
                        Clear
                    </button>
                )}
                <input
                    type="text"
                    placeholder="Search here by recipe or ingredient name..."
                    className="input focus:outline-none input-bordered border-dotted border-r-0 border-2 border-orange-400 focus:border-orange-400 rounded-none w-full h-10"
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="text-lg px-3 bg-orange-500 hover:bg-orange-400 text-white py-1 h-10 lg:rounded-tr-2xl font-medium text-center font-serif"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </>
    );
};

export default Search;
