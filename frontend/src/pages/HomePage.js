import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [query, setQuery] = useState();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload
    if (query.trim()) {
      navigate(`/destination/${query}`);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  return (
    <div className="homepage">
      <h1>TripSense</h1>

      {/* Search bar (unchanged) */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search a country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Explore buttons */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        {countries.map((c) => (
          <button
            key={c._id}
            onClick={() => navigate(`/explore/${c.name}`)}
            style={{
              margin: "10px",
              padding: "12px 24px",
              borderRadius: "8px",
              background: "#f65a3a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Explore {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
