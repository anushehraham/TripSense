import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AttractionsPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [attractions, setAttractions] = useState([]);
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
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        console.log(`Fetching attractions for country: ${country}`);
        console.log(`API URL: http://localhost:5000/api/attractions/country/${country}`);
        
        // Fetch from your MongoDB attractions collection
        const response = await axios.get(`http://localhost:5000/api/attractions/country/${country}`);
        console.log("Attractions data received:", response.data);
        console.log("Data type:", typeof response.data);
        console.log("Data length:", response.data?.length);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setAttractions(response.data);
          setError(null);
          console.log("Attractions set successfully:", response.data);
        } else {
          console.log("No attractions found or invalid data structure");
          setError(`No attractions found for ${displayCountry}. Please check back later!`);
          setAttractions([]);
        }
      } catch (err) {
        console.error("Error fetching attractions:", err);
        console.error("Error details:", {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        
        if (err.code === 'ERR_NETWORK') {
          setError(`Network error: Cannot connect to server. Please make sure your backend is running on port 5000.`);
        } else if (err.response?.status === 404) {
          setError(`No attractions found for ${displayCountry}. Please add some attractions to your database first.`);
        } else if (err.response?.status === 500) {
          setError(`Server error: ${err.response.data?.message || 'Unknown server error'}`);
        } else {
          setError(`Failed to load attractions for ${displayCountry}. Error: ${err.message}`);
        }
        setAttractions([]);
      } finally {
        setLoading(false);
      }
    };

    if (country) {
      fetchAttractions();
    }
  }, [country, displayCountry]);

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
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>⏳</div>
          Loading amazing attractions for {displayCountry}...
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
          🏛️ Top Attractions in {displayCountry}
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "40px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Discover the most amazing places to visit in {displayCountry}!
        </p>

        {/* Debug Info - Remove this later */}
        <div style={{ 
          backgroundColor: "#e3f2fd",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "30px",
          textAlign: "left"
        }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#1976d2" }}>🔍 Debug Info:</h4>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>Country: {country}</p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>Display Country: {displayCountry}</p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>Attractions Count: {attractions.length}</p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>Attractions Data: {JSON.stringify(attractions, null, 2)}</p>
        </div>

        {error && (
          <div style={{ 
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "30px",
            fontSize: "1.1rem"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>⚠️</div>
            {error}
          </div>
        )}

        {attractions.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
            marginTop: "30px"
          }}>
            {attractions.map((attraction, index) => (
              <div
                key={attraction._id || index}
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
                  src={attraction.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={attraction.name || attraction.title || "Attraction"}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px"
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                  }}
                />
                <h3 style={{ 
                  color: "#2c3e50", 
                  marginBottom: "10px",
                  fontSize: "1.3rem",
                  fontWeight: "600"
                }}>
                  {attraction.name || attraction.title || "Unknown Attraction"}
                </h3>
                <p style={{ 
                  color: "#7f8c8d", 
                  marginBottom: "15px",
                  lineHeight: "1.5"
                }}>
                  {attraction.description || "No description available"}
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
                    backgroundColor: "#f65a3a",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "0.9rem"
                  }}>
                    ⭐ {attraction.rating || "N/A"}
                  </span>
                  {attraction.city && (
                    <span style={{ 
                      color: "#27ae60",
                      fontSize: "0.9rem",
                      fontWeight: "500"
                    }}>
                      🏙️ {attraction.city}
                    </span>
                  )}
                </div>
                
                {attraction.tips && (
                  <div style={{ 
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    color: "#495057"
                  }}>
                    <strong>💡 Tip:</strong> {attraction.tips}
                  </div>
                )}
                
                {attraction.location && (
                  <div style={{ 
                    backgroundColor: "#e3f2fd",
                    padding: "10px",
                    borderRadius: "8px",
                    marginTop: "10px",
                    fontSize: "0.9rem",
                    color: "#1976d2"
                  }}>
                    <strong>📍 Location:</strong> {attraction.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "30px"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📭</div>
            No attractions found to display
          </div>
        )}

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

export default AttractionsPage;
