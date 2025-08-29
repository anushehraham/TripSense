import React from "react";
import { useParams } from "react-router-dom";

const features = [
  "Travel Guide",
  "Trip Planner",
  "Budget Estimator",
  "Real-time Update",
  "Review"
];

const ExplorePage = () => {
  const { countryName } = useParams();

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h1>Explore {countryName}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
        {features.map((feature) => (
          <button
            key={feature}
            style={{
              padding: "16px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
              background: "#f65a3a",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              transition: "background 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#e24e2e"}
            onMouseOut={e => e.currentTarget.style.background = "#f65a3a"}
          >
            {feature}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;