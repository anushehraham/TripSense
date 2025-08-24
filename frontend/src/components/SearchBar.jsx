import React, { useState } from "react";
import "./SearchBar.css";
import { searchCountry } from "../api/countryapi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const data = await searchCountry(query);
    setResult(data);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search your destination"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {result && (
        <div className="search-result">
          <h3>{result.name}</h3>
          <p>{result.description}</p>
          <img src={result.image} alt={result.name} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
