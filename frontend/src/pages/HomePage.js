import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [query, setQuery] = useState(""); // ✅ default empty string
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload
    if (query.trim()) {
      navigate(`/destination/${query.toLowerCase()}`); // ✅ safer URLs
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // ✅ helper function to create clean URLs
  const slugify = (name) =>
    name.toLowerCase().replace(/\s+/g, "-"); // "United States" -> "united-states"

  return (
    <div className="homepage">
      <h1>TripSense</h1>

      {/* Search bar */}
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
            onClick={() => {
              const url = `/explore/${slugify(c.name)}`;
              console.log("Navigating to:", url, "for country:", c.name);
              navigate(url);
            }}
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
