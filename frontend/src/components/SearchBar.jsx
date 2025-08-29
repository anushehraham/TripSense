import React, { useState } from "react";
import "./SearchBar.css";
import { searchCountry } from "../api/countryapi";
import CountryCard from "./CountryCard"; // import the styled card

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const data = await searchCountry(query);
    setResult(data);
  };

  return (
    <div className="search-container">
      {/* Search box */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search your destination"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Country description box beside search */}
      {result && <CountryCard country={result} />}
    </div>
  );
};

export default SearchBar;
