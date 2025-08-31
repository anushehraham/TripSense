import React from "react";
import "../styles/CountryCard.css";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  // ✅ helper function to create clean URLs
  const slugify = (name) =>
    name.toLowerCase().replace(/\s+/g, "-"); // "United States" -> "united-states"

  // Add debugging to see the country object structure
  console.log("CountryCard received country:", country);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        className="country-card"
        style={{ backgroundImage: `url(${country.image})` }}
      >
        <div className="overlay"></div>
        <div className="content">
          <h2>{country.name}</h2>
          <p>{country.description}</p>
        </div>
      </div>
      <button
        className="explore-btn"
        style={{ marginTop: 16 }}
        onClick={() => {
          if (!country.name) {
            console.error("Country name is missing:", country);
            return;
          }
          const url = `/explore/${slugify(country.name)}`;
          console.log("CountryCard navigating to:", url, "for country:", country.name);
          navigate(url);
        }}
      >
        Explore
      </button>
    </div>
  );
};

export default CountryCard;
