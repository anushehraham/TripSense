import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { searchCountry } from "../api/countryapi";
import CountryCard from "./CountryCard"; // import the styled card

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a country name");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log("Searching for:", query);
      const data = await searchCountry(query);
      console.log("Search result:", data);
      
      if (data) {
        setResult(data);
      } else {
        setError("Country not found. Please try a different search term.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Error searching for country. Please try again.");
    } finally {
      setLoading(false);
    }
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
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div style={{
          color: "#e74c3c",
          textAlign: "center",
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#fdf2f2",
          borderRadius: "5px",
          border: "1px solid #fecaca"
        }}>
          {error}
        </div>
      )}

      {/* Country description box beside search */}
      {result && <CountryCard country={result} />}
    </div>
  );
};

export default SearchBar;
