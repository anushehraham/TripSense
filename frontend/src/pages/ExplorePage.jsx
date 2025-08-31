import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  // ✅ Convert slug (united-states) → "United States"
  const formatCountryName = (slug) => {
    if (!slug) return "";
    return slug
      .split("-") // ["united", "states"]
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each
      .join(" "); // "United States"
  };

  const displayCountry = formatCountryName(country);

  return (
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #87CEEB 0%, #E6E6FA 100%)",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "auto"
    }}>
      <div style={{ 
        textAlign: "center",
        maxWidth: "800px",
        padding: "40px 20px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)"
      }}>
        <h1 style={{ 
          color: "#2c3e50", 
          marginBottom: "20px",
          fontSize: "3rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
          Explore {displayCountry} !!
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "50px",
          fontSize: "1.3rem",
          lineHeight: "1.6",
          fontStyle: "italic"
        }}>
          Your journey starts here! 😊 Plan smarter 💡, travel deeper ✈️, and explore like never before 🌠.
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ 
            color: "#34495e", 
            marginBottom: "30px",
            fontSize: "1.5rem",
            fontWeight: "600"
          }}>
            Choose Your Adventure With Us!!
          </h3>
          
          {["Travel Guide", "Trip Planner", "Budget Estimator", "Real-time Update", "Review"].map((feature, index) => (
            <button
              key={index}
              style={{
                display: "block",
                margin: "20px auto",
                padding: "25px 40px",
                fontSize: "18px",
                backgroundColor: "#f65a3a",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
                width: "350px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#e24e2e";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#f65a3a";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onClick={() => {
                if (feature === "Travel Guide") {
                  navigate(`/explore/${country}/travel-guide`);
                } else {
                  console.log(`Feature clicked: ${feature}`);
                  alert(`You selected: ${feature}`);
                }
              }}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
