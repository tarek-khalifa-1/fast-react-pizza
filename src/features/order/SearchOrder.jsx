import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    if (!query) return;
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:w-32 focus:ring focus:ring-yellow-500 focus:outline-none sm:w-64 focus:sm:w-72 md:text-base"
      />
    </form>
  );
}

export default SearchOrder;
