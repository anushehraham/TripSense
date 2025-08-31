import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BestTimePage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [bestTime, setBestTime] = useState(null);
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
    const fetchBestTime = async () => {
      try {
        setLoading(true);
        console.log(`Fetching best time for country: ${country}`);
        
        // Fetch from your MongoDB besttime collection
        const response = await axios.get(`http://localhost:5000/api/besttime/country/${country}`);
        console.log("Best time data received:", response.data);
        
        if (response.data && response.data.length > 0) {
          setBestTime(response.data[0]); // Get the first result
          setError(null);
        } else {
          setError(`No best time information found for ${displayCountry}. Please check back later!`);
          setBestTime(null);
        }
      } catch (err) {
        console.error("Error fetching best time:", err);
        
        if (err.code === 'ERR_NETWORK') {
          setError(`Network error: Cannot connect to server. Please make sure your backend is running on port 5000.`);
        } else if (err.response?.status === 404) {
          setError(`No best time information found for ${displayCountry}. Please add some data to your database first.`);
        } else if (err.response?.status === 500) {
          setError(`Server error: ${err.response.data?.message || 'Unknown server error'}`);
        } else {
          setError(`Failed to load best time information for ${displayCountry}. Error: ${err.message}`);
        }
        setBestTime(null);
      } finally {
        setLoading(false);
      }
    };

    if (country) {
      fetchBestTime();
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
        background: "linear-gradient(135deg,rgb(66, 164, 245) 0%,rgb(82, 135, 196) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ 
          textAlign: "center",
          color: "white",
          fontSize: "1.5rem"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>📅</div>
          Loading best time information for {displayCountry}...
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
      background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
      margin: 0,
      padding: "20px",
      overflow: "auto"
    }}>
      <div style={{ 
        textAlign: "center",
        maxWidth: "800px",
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
          📅 Best Time to Visit {displayCountry}
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "40px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Find out when is the perfect time to explore {displayCountry}!
        </p>

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

        {bestTime && (
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            marginTop: "30px"
          }}>
            {/* Best Time Period */}
            <div style={{
              textAlign: "center",
              marginBottom: "30px"
            }}>
              <h2 style={{ 
                color: "#0984e3", 
                marginBottom: "15px",
                fontSize: "2rem",
                fontWeight: "bold"
              }}>
                🕐 {bestTime.bestTime}
              </h2>
              <div style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#0984e3",
                margin: "0 auto",
                borderRadius: "2px"
              }}></div>
            </div>

            {/* Details */}
            {bestTime.details && (
              <div style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "25px",
                textAlign: "left"
              }}>
                <h3 style={{ 
                  color: "#2c3e50", 
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: "600"
                }}>
                  📋 Details
                </h3>
                <p style={{ 
                  color: "#495057", 
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  margin: 0
                }}>
                  {bestTime.details}
                </p>
              </div>
            )}

            {/* Travel Tip */}
            {bestTime.tip && (
              <div style={{
                backgroundColor: "#e3f2fd",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "25px"
              }}>
                <h3 style={{ 
                  color: "#1976d2", 
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: "600"
                }}>
                  💡 Travel Tip
                </h3>
                <p style={{ 
                  color: "#1976d2", 
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  margin: 0
                }}>
                  {bestTime.tip}
                </p>
              </div>
            )}

            {/* Summary Card */}
            <div style={{
              backgroundColor: "#f0f8ff",
              padding: "20px",
              borderRadius: "15px",
              border: "2px solid #74b9ff"
            }}>
              <h3 style={{ 
                color: "#2c3e50", 
                marginBottom: "15px",
                fontSize: "1.2rem",
                fontWeight: "600",
                textAlign: "center"
              }}>
                🎯 Quick Summary
              </h3>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap"
              }}>
                <div style={{
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  minWidth: "150px"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📅</div>
                  <div style={{ fontWeight: "600", color: "#2c3e50" }}>Best Time</div>
                  <div style={{ color: "#0984e3", fontSize: "0.9rem" }}>{bestTime.bestTime}</div>
                </div>
                
                <div style={{
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  minWidth: "150px"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🌍</div>
                  <div style={{ fontWeight: "600", color: "#2c3e50" }}>Country</div>
                  <div style={{ color: "#0984e3", fontSize: "0.9rem" }}>{bestTime.country}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Button */}
        <div style={{
          marginTop: "40px"
        }}>
          <button
            style={{
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
    </div>
  );
};

export default BestTimePage;
