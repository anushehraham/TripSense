import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload
    if (query.trim()) {
      // navigate to destination page with the query
      navigate(`/destination/${query}`);
    }
  };


  return (
    <div className="homepage">
      <h1>TripSense</h1>
      {/* Use your existing searchbar UI */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search a country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
