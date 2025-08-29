import React from "react";
import "../styles/CountryCard.css";

const CountryCard = ({ country, onExplore }) => {
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
        onClick={() => onExplore && onExplore(country)}
      >
        Explore
      </button>
    </div>
  );
};

export default CountryCard;
