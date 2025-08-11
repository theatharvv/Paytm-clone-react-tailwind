import logo from "../img/icons8-search.gif";

const SearchBar = ({ query, setQuery }) => {
  return (

      <form className="flex items-center w-full max-w-lg px-2 justify-end">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img src={logo} alt="search-logo" className="w-5" />
          </div>
          <input
            type="text"
            id="simple-search"
            placeholder="Search User..."
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

  );
};

export default SearchBar;
