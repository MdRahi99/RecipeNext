const Search = () => {
    return (
        <>
            <div className="flex items-center w-full lg:w-2/6">
                <input type="text" placeholder="Search Here..." className="input focus:outline-none input-bordered border-dotted border-r-0 border-2 border-orange-400 focus:border-orange-400 rounded-none w-full h-9" />
                <button className="text-lg px-3 bg-orange-500 hover:bg-orange-400 text-white py-1 lg:rounded-tr-2xl font-medium text-center font-serif">Search</button>
            </div>
        </>
    );
};

export default Search;