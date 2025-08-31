import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BudgetEstimatorPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    hotel: null,
    restaurants: null,
    traffic: null,
    weeksToStay: null
  });
  const [showResults, setShowResults] = useState(false);

  // ✅ Convert slug (united-states) → "United States"
  const formatCountryName = (slug) => {
    if (!slug) return "";
    return slug
      .split("-") // ["united", "states"]
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each
      .join(" "); // "United States"
  };

  const displayCountry = formatCountryName(country);

  // Price options for each category
  const priceOptions = {
    hotel: [
      { label: "Budget ($50-100/night)", value: 75 },
      { label: "Mid-range ($100-200/night)", value: 150 },
      { label: "Luxury ($200-500/night)", value: 350 },
      { label: "Premium ($500+/night)", value: 600 }
    ],
    restaurants: [
      { label: "Budget ($10-25/day)", value: 17.5 },
      { label: "Mid-range ($25-50/day)", value: 37.5 },
      { label: "Fine Dining ($50-100/day)", value: 75 },
      { label: "Premium ($100+/day)", value: 125 }
    ],
    traffic: [
      { label: "Public Transport ($5-15/day)", value: 10 },
      { label: "Taxis ($20-50/day)", value: 35 },
      { label: "Car Rental ($50-100/day)", value: 75 },
      { label: "Private Driver ($100+/day)", value: 150 }
    ],
    weeksToStay: Array.from({ length: 10 }, (_, i) => ({
      label: `${i + 1} week${i === 0 ? '' : 's'}`,
      value: i + 1
    }))
  };

  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const calculateTotal = () => {
    if (!selectedOptions.hotel || !selectedOptions.restaurants || 
        !selectedOptions.traffic || !selectedOptions.weeksToStay) {
      return 0;
    }

    const hotelCost = selectedOptions.hotel.value * 7 * selectedOptions.weeksToStay.value;
    const foodCost = selectedOptions.restaurants.value * 7 * selectedOptions.weeksToStay.value;
    const transportCost = selectedOptions.traffic.value * 7 * selectedOptions.weeksToStay.value;

    return hotelCost + foodCost + transportCost;
  };

  const totalBudget = calculateTotal();

  const isAllSelected = Object.values(selectedOptions).every(option => option !== null);

  return (
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #00b894 0%, #00a085 100%)",
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
          💰 Budget Estimator for {displayCountry}
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "40px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Plan your trip budget by selecting your preferences!
        </p>

        {/* Budget Categories */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}>
          {/* Hotel */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            border: selectedOptions.hotel ? "3px solid #00b894" : "3px solid transparent"
          }}>
            <h3 style={{ 
              color: "#2c3e50", 
              marginBottom: "20px",
              fontSize: "1.5rem",
              fontWeight: "600",
              textAlign: "center"
            }}>
              🏨 Hotel
            </h3>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              {priceOptions.hotel.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect('hotel', option)}
                  style={{
                    padding: "12px 15px",
                    fontSize: "14px",
                    backgroundColor: selectedOptions.hotel?.value === option.value ? "#00b894" : "#f8f9fa",
                    color: selectedOptions.hotel?.value === option.value ? "white" : "#495057",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "left"
                  }}
                  onMouseOver={(e) => {
                    if (selectedOptions.hotel?.value !== option.value) {
                      e.target.style.backgroundColor = "#e9ecef";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedOptions.hotel?.value !== option.value) {
                      e.target.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Restaurants */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            border: selectedOptions.restaurants ? "3px solid #00b894" : "3px solid transparent"
          }}>
            <h3 style={{ 
              color: "#2c3e50", 
              marginBottom: "20px",
              fontSize: "1.5rem",
              fontWeight: "600",
              textAlign: "center"
            }}>
              🍽️ Restaurants
            </h3>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              {priceOptions.restaurants.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect('restaurants', option)}
                  style={{
                    padding: "12px 15px",
                    fontSize: "14px",
                    backgroundColor: selectedOptions.restaurants?.value === option.value ? "#00b894" : "#f8f9fa",
                    color: selectedOptions.restaurants?.value === option.value ? "white" : "#495057",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "left"
                  }}
                  onMouseOver={(e) => {
                    if (selectedOptions.restaurants?.value !== option.value) {
                      e.target.style.backgroundColor = "#e9ecef";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedOptions.restaurants?.value !== option.value) {
                      e.target.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Traffic */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            border: selectedOptions.traffic ? "3px solid #00b894" : "3px solid transparent"
          }}>
            <h3 style={{ 
              color: "#2c3e50", 
              marginBottom: "20px",
              fontSize: "1.5rem",
              fontWeight: "600",
              textAlign: "center"
            }}>
              🚗 Traffic
            </h3>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              {priceOptions.traffic.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect('traffic', option)}
                  style={{
                    padding: "12px 15px",
                    fontSize: "14px",
                    backgroundColor: selectedOptions.traffic?.value === option.value ? "#00b894" : "#f8f9fa",
                    color: selectedOptions.traffic?.value === option.value ? "white" : "#495057",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "left"
                  }}
                  onMouseOver={(e) => {
                    if (selectedOptions.traffic?.value !== option.value) {
                      e.target.style.backgroundColor = "#e9ecef";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedOptions.traffic?.value !== option.value) {
                      e.target.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weeks to Stay */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            border: selectedOptions.weeksToStay ? "3px solid #00b894" : "3px solid transparent"
          }}>
            <h3 style={{ 
              color: "#2c3e50", 
              marginBottom: "20px",
              fontSize: "1.5rem",
              fontWeight: "600",
              textAlign: "center"
            }}>
              📅 Weeks to Stay
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8px"
            }}>
              {priceOptions.weeksToStay.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect('weeksToStay', option)}
                  style={{
                    padding: "12px 8px",
                    fontSize: "14px",
                    backgroundColor: selectedOptions.weeksToStay?.value === option.value ? "#00b894" : "#f8f9fa",
                    color: selectedOptions.weeksToStay?.value === option.value ? "white" : "#495057",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "center"
                  }}
                  onMouseOver={(e) => {
                    if (selectedOptions.weeksToStay?.value !== option.value) {
                      e.target.style.backgroundColor = "#e9ecef";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedOptions.weeksToStay?.value !== option.value) {
                      e.target.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={() => setShowResults(true)}
          disabled={!isAllSelected}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: isAllSelected ? "#00b894" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: isAllSelected ? "pointer" : "not-allowed",
            fontWeight: "600",
            transition: "background 0.3s ease",
            marginBottom: "30px"
          }}
          onMouseOver={(e) => {
            if (isAllSelected) {
              e.target.style.background = "#00a085";
            }
          }}
          onMouseOut={(e) => {
            if (isAllSelected) {
              e.target.style.background = "#00b894";
            }
          }}
        >
          💰 Calculate Total Budget
        </button>

        {/* Results */}
        {showResults && isAllSelected && (
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "30px",
            borderRadius: "15px",
            border: "3px solid #00b894",
            marginTop: "20px"
          }}>
            <h2 style={{ 
              color: "#2c3e50", 
              marginBottom: "20px",
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center"
            }}>
              💰 Your Total Budget
            </h2>
            
            <div style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#00b894",
              textAlign: "center",
              marginBottom: "30px"
            }}>
              ${totalBudget.toLocaleString()}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginBottom: "20px"
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#2c3e50" }}>Hotel</div>
                <div style={{ color: "#00b894", fontSize: "1.1rem" }}>
                  ${(selectedOptions.hotel.value * 7 * selectedOptions.weeksToStay.value).toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#2c3e50" }}>Food</div>
                <div style={{ color: "#00b894", fontSize: "1.1rem" }}>
                  ${(selectedOptions.restaurants.value * 7 * selectedOptions.weeksToStay.value).toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#2c3e50" }}>Transport</div>
                <div style={{ color: "#00b894", fontSize: "1.1rem" }}>
                  ${(selectedOptions.traffic.value * 7 * selectedOptions.weeksToStay.value).toLocaleString()}
                </div>
              </div>
            </div>

            <p style={{ 
              textAlign: "center", 
              color: "#7f8c8d", 
              fontSize: "0.9rem",
              fontStyle: "italic"
            }}>
              * Budget is calculated for {selectedOptions.weeksToStay.value} week{selectedOptions.weeksToStay.value > 1 ? 's' : ''} stay
            </p>
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

export default BudgetEstimatorPage;