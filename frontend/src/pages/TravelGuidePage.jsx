import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const TravelGuidePage = () => {
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

  const categories = [
    {
      name: "Attractions",
      icon: "📍",
      route: "attractions"
    },
    {
      name: "Food",
      icon: "🍽️",
      route: "food"
    },
    {
      name: "Best Time to Go",
      icon: "📅",
      route: "best-time"
    },
    {
      name: "Local Language",
      icon: "🗣️",
      route: "language"
    },
    {
      name: "Culture",
      icon: "🎭",
      route: "culture"
    },
    {
      name: "Tips",
      icon: "💡",
      route: "tips"
    }
  ];

  const handleCategoryClick = (category) => {
    const url = `/explore/${country}/${category.route}`;
    console.log(`Navigating to: ${url}`);
    navigate(url);
  };

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
        maxWidth: "900px",
        padding: "40px 20px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)"
      }}>
        <h1 style={{ 
          color: "#2c3e50", 
          marginBottom: "20px",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
          Explore  {displayCountry}!
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "40px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Discover everything you need to know about {displayCountry}!
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ 
            color: "#34495e", 
            marginBottom: "30px",
            fontSize: "1.4rem",
            fontWeight: "600"
          }}>
            Choose a Category
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            {categories.map((category, index) => (
              <button
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "25px 20px",
                  fontSize: "16px",
                  backgroundColor: "#88d8c0",
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  minHeight: "120px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#7ac7b0";
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#88d8c0";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <span style={{ fontSize: "2rem", marginBottom: "10px" }}>
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          style={{
            marginTop: "40px",
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#34495e",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#2c3e50"}
          onMouseOut={(e) => e.currentTarget.style.background = "#34495e"}
          onClick={() => navigate(`/explore/${country}`)}
        >
          ← Back to Explore
        </button>
      </div>
    </div>
  );
};

export default TravelGuidePage;
