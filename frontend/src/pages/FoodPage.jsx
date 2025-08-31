import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Convert slug (united-states) → "United States"
  const formatCountryName = (slug) => {
    if (!slug) return "";
    return slug
      .split("-") // ["united", "states"]
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each
      .join(" "); // "United States"
  };

  const displayCountry = formatCountryName(country);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        // This will fetch from your MongoDB - adjust the endpoint as needed
        const response = await axios.get(`http://localhost:5000/api/foods/${country}`);
        setFoods(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching foods:", err);
        setError("Failed to load food information. Please try again later.");
        // For now, show sample data
        setFoods([
          {
            name: "Croissant",
            description: "Buttery, flaky French pastry in a crescent shape.",
            image: "https://via.placeholder.com/300x200?text=Croissant",
            type: "Breakfast",
            price: "€2-4",
            bestPlace: "Local Boulangerie",
            tips: "Best enjoyed fresh in the morning"
          },
          {
            name: "Coq au Vin",
            description: "Classic French dish of chicken braised with wine, lardons, mushrooms, and pearl onions.",
            image: "https://via.placeholder.com/300x200?text=Coq+au+Vin",
            type: "Main Course",
            price: "€15-25",
            bestPlace: "Traditional Bistros",
            tips: "Perfect with a glass of red wine"
          },
          {
            name: "Macarons",
            description: "Delicate French cookies made with egg whites, sugar, and almond flour.",
            image: "https://via.placeholder.com/300x200?text=Macarons",
            type: "Dessert",
            price: "€2-5 each",
            bestPlace: "Ladurée or Pierre Hermé",
            tips: "Try different flavors - pistachio is a classic"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [country]);

  if (loading) {
    return (
      <div style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #87CEEB 0%, #E6E6FA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ 
          textAlign: "center",
          color: "white",
          fontSize: "1.5rem"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🍽️</div>
          Loading delicious food...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #87CEEB 0%, #E6E6FA 100%)",
      margin: 0,
      padding: "20px",
      overflow: "auto"
    }}>
      <div style={{ 
        textAlign: "center",
        maxWidth: "1200px",
        margin: "0 auto",
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
          🍽️ Must-Try Foods in {displayCountry}
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "40px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Taste the authentic flavors and culinary traditions of {displayCountry}!
        </p>

        {error && (
          <div style={{ 
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "30px"
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px",
          marginTop: "30px"
        }}>
          {foods.map((food, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={food.image}
                alt={food.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px"
                }}
              />
              <h3 style={{ 
                color: "#2c3e50", 
                marginBottom: "10px",
                fontSize: "1.3rem",
                fontWeight: "600"
              }}>
                {food.name}
              </h3>
              <p style={{ 
                color: "#7f8c8d", 
                marginBottom: "15px",
                lineHeight: "1.5"
              }}>
                {food.description}
              </p>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                flexWrap: "wrap",
                gap: "10px"
              }}>
                <span style={{ 
                  backgroundColor: "#e74c3c",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  fontSize: "0.9rem"
                }}>
                  🍽️ {food.type}
                </span>
                <span style={{ 
                  backgroundColor: "#27ae60",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  fontSize: "0.9rem"
                }}>
                  💰 {food.price}
                </span>
              </div>
              <div style={{ 
                backgroundColor: "#f8f9fa",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}>
                <strong>📍 Best Place:</strong> {food.bestPlace}
              </div>
              <div style={{ 
                backgroundColor: "#fff3cd",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                color: "#856404"
              }}>
                <strong>💡 Tip:</strong> {food.tips}
              </div>
            </div>
          ))}
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
          onClick={() => navigate(`/explore/${country}/travel-guide`)}
        >
          ← Back to Travel Guide
        </button>
      </div>
    </div>
  );
};

export default FoodPage;
