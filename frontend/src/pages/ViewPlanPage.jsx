import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewPlanPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [savedPlan, setSavedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

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
    // Load saved plan from localStorage
    const loadSavedPlan = () => {
      try {
        const planData = localStorage.getItem('savedTripPlan');
        if (planData) {
          const parsedPlan = JSON.parse(planData);
          console.log("Loaded saved plan:", parsedPlan);
          console.log("Start date:", parsedPlan.travelDates?.startDate);
          console.log("End date:", parsedPlan.travelDates?.endDate);
          setSavedPlan(parsedPlan);
        }
      } catch (error) {
        console.error("Error loading saved plan:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedPlan();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const clearSavedPlan = () => {
    localStorage.removeItem('savedTripPlan');
    setSavedPlan(null);
  };

  if (loading) {
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
          <p style={{ color: "#7f8c8d", fontSize: "1.2rem" }}>Loading your saved plan...</p>
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
          Your Trip Plan for {displayCountry}!
        </h1>

        {!savedPlan ? (
          <div>
            <p style={{ 
              color: "#7f8c8d", 
              marginBottom: "40px",
              fontSize: "1.2rem",
              lineHeight: "1.6"
            }}>
              No saved plan found. Create a plan first!
            </p>
            <button
              style={{
                padding: "15px 30px",
                fontSize: "16px",
                backgroundColor: "#88d8c0",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#7ac7b0"}
              onMouseOut={(e) => e.currentTarget.style.background = "#88d8c0"}
              onClick={() => navigate(`/explore/${country}/day-plan`)}
            >
              Create New Plan
            </button>
          </div>
        ) : (
          <div>
            {/* Travel Dates Section */}
            <div style={{ 
              marginBottom: "40px",
              padding: "25px",
              backgroundColor: "#f8f9fa",
              borderRadius: "15px",
              border: "2px solid #e9ecef"
            }}>
              <h2 style={{ 
                color: "#2c3e50", 
                marginBottom: "20px",
                fontSize: "1.8rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
              }}>
                📅 Travel Dates
              </h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginBottom: "20px"
              }}>
                <div style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #dee2e6"
                }}>
                  <h3 style={{ color: "#495057", marginBottom: "8px", fontSize: "1rem" }}>Start Date</h3>
                  <p style={{ color: "#6c757d", fontSize: "1.1rem", fontWeight: "500" }}>
                    {formatDate(savedPlan.travelDates?.startDate)}
                  </p>
                </div>
                
                <div style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #dee2e6"
                }}>
                  <h3 style={{ color: "#495057", marginBottom: "8px", fontSize: "1rem" }}>End Date</h3>
                  <p style={{ color: "#6c757d", fontSize: "1.1rem", fontWeight: "500" }}>
                    {formatDate(savedPlan.travelDates?.endDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div style={{ 
              marginBottom: "40px",
              padding: "25px",
              backgroundColor: "#f8f9fa",
              borderRadius: "15px",
              border: "2px solid #e9ecef"
            }}>
              <h2 style={{ 
                color: "#2c3e50", 
                marginBottom: "20px",
                fontSize: "1.8rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
              }}>
                🎯 Selected Activities
              </h2>
              
              {savedPlan.destinations && savedPlan.destinations.length > 0 ? (
                <div style={{
                  display: "grid",
                  gap: "15px"
                }}>
                  {savedPlan.destinations.map((destination, index) => {
                    const gradients = [
                      "linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 100%)", // Soft pink
                      "linear-gradient(135deg, #E5F3FF 0%, #F0F8FF 100%)", // Soft blue
                      "linear-gradient(135deg, #E5FFE5 0%, #F0FFF0 100%)", // Soft green
                      "linear-gradient(135deg, #FFF5E5 0%, #FFF8F0 100%)", // Soft orange
                      "linear-gradient(135deg, #F0E5FF 0%, #F8F0FF 100%)", // Soft purple
                      "linear-gradient(135deg, #E5FFFF 0%, #F0FFFF 100%)"  // Soft cyan
                    ];
                    
                    return (
                      <div key={destination._id} style={{
                        padding: "20px",
                        borderRadius: "12px",
                        background: gradients[index % gradients.length],
                        border: "1px solid #e0e0e0",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
                      }}>
                        <h3 style={{ 
                          color: "#2c3e50", 
                          marginBottom: "10px",
                          fontSize: "1.3rem",
                          fontWeight: "600"
                        }}>
                          {destination.name}
                        </h3>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "20px",
                          fontSize: "1rem",
                          color: "#7f8c8d"
                        }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <span style={{ color: "#e74c3c" }}>📍</span> {destination.city}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <span style={{ color: "#f39c12" }}>⭐</span> {destination.rating}/5
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ 
                  color: "#6c757d", 
                  fontSize: "1.1rem",
                  textAlign: "center",
                  fontStyle: "italic"
                }}>
                  No activities selected yet.
                </p>
              )}
            </div>

            {/* Plan Info */}
            <div style={{ 
              marginBottom: "30px",
              padding: "15px",
              backgroundColor: "#e8f5e8",
              borderRadius: "10px",
              border: "2px solid #4caf50"
            }}>
              <p style={{ 
                color: "#2c3e50", 
                fontSize: "1rem",
                margin: 0
              }}>
                <strong>Plan created:</strong> {savedPlan.savedAt ? formatDate(savedPlan.savedAt) : "Recently"}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <button
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  backgroundColor: "#88d8c0",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#7ac7b0"}
                onMouseOut={(e) => e.currentTarget.style.background = "#88d8c0"}
                onClick={() => navigate(`/explore/${country}/day-plan`)}
              >
                Edit Plan
              </button>
              
              <button
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#c0392b"}
                onMouseOut={(e) => e.currentTarget.style.background = "#e74c3c"}
                onClick={clearSavedPlan}
              >
                Clear Plan
              </button>
            </div>
          </div>
        )}

        <button
          style={{
            marginTop: "30px",
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
          onClick={() => navigate(`/explore/${country}/trip-planner`)}
        >
          ← Back to Trip Planner
        </button>
      </div>
    </div>
  );
};

export default ViewPlanPage;
