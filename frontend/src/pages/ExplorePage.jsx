import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FunFactModal from "../components/FunFactModal";
import axios from "axios";

const ExplorePage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showFunFactModal, setShowFunFactModal] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Convert slug (united-states) → "United States"
  const formatCountryName = (slug) => {
    if (!slug) return "";
    return slug
      .split("-") // ["united", "states"]
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each
      .join(" "); // "United States"
  };

  const displayCountry = formatCountryName(country);

  // Function to fetch emergency data
  const fetchEmergencyData = async () => {
    try {
      setLoading(true);
      console.log('Fetching emergency data for:', displayCountry);
      
      // Try different country name formats
      const countryVariations = [
        displayCountry, // "France"
        displayCountry.toLowerCase(), // "france"
        displayCountry.toUpperCase(), // "FRANCE"
        country, // original slug "france"
        country.charAt(0).toUpperCase() + country.slice(1) // "France" from "france"
      ];
      
      let emergencyInfo = null;
      
      for (const countryName of countryVariations) {
        try {
          console.log('Trying country name:', countryName);
          const response = await axios.get(`http://localhost:5000/api/emergency/country/${countryName}`);
          console.log('API response for', countryName, ':', response.data);
          
          if (response.data.success && response.data.data) {
            emergencyInfo = response.data.data;
            console.log('Found emergency data for:', countryName);
            break;
          }
        } catch (err) {
          console.log('No data for:', countryName);
        }
      }
      
      if (emergencyInfo) {
        setEmergencyData(emergencyInfo);
        console.log('Emergency data set:', emergencyInfo);
      } else {
        console.log('No emergency data found for any variation');
      }
    } catch (error) {
      console.error('Error fetching emergency data:', error);
      console.error('Error details:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle emergency button click
  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
    if (!emergencyData) {
      fetchEmergencyData();
    }
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
          
          {["Travel Guide", "Trip Planner", "Budget Estimator", "Packlist", "Fun Fact", "Emergency", "Review"].map((feature, index) => (
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
                } else if (feature === "Trip Planner") {
                  navigate(`/explore/${country}/trip-planner`);
                } else if (feature === "Budget Estimator") {
                  navigate(`/explore/${country}/budget-estimator`);
                } else if (feature === "Packlist") {
                  navigate(`/explore/${country}/packlist`);
                } else if (feature === "Fun Fact") {
                  setShowFunFactModal(true);
                } else if (feature === "Emergency") {
                  handleEmergencyClick();
                } else if (feature === "Review") {
                  navigate(`/explore/${country}/review`);
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

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            maxWidth: "500px",
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto",
            position: "relative"
          }}>
            <button
              onClick={() => setShowEmergencyModal(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666"
              }}
            >
              ×
            </button>
            
            <h2 style={{ 
              color: "#e74c3c", 
              marginBottom: "20px",
              fontSize: "1.8rem",
              textAlign: "center"
            }}>
              🚨 Emergency Contacts for {displayCountry}
            </h2>

            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p>Loading emergency information...</p>
              </div>
            ) : emergencyData ? (
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Emergency Numbers:</h3>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div style={{ 
                      padding: "10px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px",
                      border: "1px solid #e9ecef"
                    }}>
                      <strong>🚔 Police:</strong> {emergencyData.emergencyNumbers.police}
                    </div>
                    <div style={{ 
                      padding: "10px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px",
                      border: "1px solid #e9ecef"
                    }}>
                      <strong>🚑 Ambulance:</strong> {emergencyData.emergencyNumbers.ambulance}
                    </div>
                    <div style={{ 
                      padding: "10px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px",
                      border: "1px solid #e9ecef"
                    }}>
                      <strong>🚒 Fire:</strong> {emergencyData.emergencyNumbers.fire}
                    </div>
                    <div style={{ 
                      padding: "10px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px",
                      border: "1px solid #e9ecef"
                    }}>
                      <strong>📞 General Emergency:</strong> {emergencyData.emergencyNumbers.general}
                    </div>
                  </div>
                </div>

                {emergencyData.embassy && (
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Embassy Information:</h3>
                    <div style={{ 
                      padding: "15px", 
                      backgroundColor: "#e8f4fd", 
                      borderRadius: "8px",
                      border: "1px solid #bee5eb"
                    }}>
                      {emergencyData.embassy.address && <p><strong>Address:</strong> {emergencyData.embassy.address}</p>}
                      {emergencyData.embassy.phone && <p><strong>Phone:</strong> {emergencyData.embassy.phone}</p>}
                      {emergencyData.embassy.email && <p><strong>Email:</strong> {emergencyData.embassy.email}</p>}
                    </div>
                  </div>
                )}

                {emergencyData.hospitals && emergencyData.hospitals.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Hospitals:</h3>
                    {emergencyData.hospitals.map((hospital, index) => (
                      <div key={index} style={{ 
                        padding: "10px", 
                        backgroundColor: "#f8f9fa", 
                        borderRadius: "8px",
                        border: "1px solid #e9ecef",
                        marginBottom: "8px"
                      }}>
                        <strong>{hospital.name}</strong>
                        {hospital.address && <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>{hospital.address}</p>}
                        {hospital.phone && <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>📞 {hospital.phone}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {emergencyData.tips && emergencyData.tips.length > 0 && (
                  <div>
                    <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Safety Tips:</h3>
                    <ul style={{ paddingLeft: "20px" }}>
                      {emergencyData.tips.map((tip, index) => (
                        <li key={index} style={{ marginBottom: "5px", fontSize: "0.9rem" }}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p>No emergency information available for {displayCountry}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fun Fact Modal */}
      <FunFactModal 
        isOpen={showFunFactModal}
        onClose={() => setShowFunFactModal(false)}
        country={country}
      />
    </div>
  );
};

export default ExplorePage;
