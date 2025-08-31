import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DayPlanPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDestinationPicker, setShowDestinationPicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

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
      name: "Travel Date",
      icon: "📋",
      route: "travel-date"
    },
    {
      name: "Activities",
      icon: "🎯",
      route: "add-destination"
    }
  ];

  const handleCategoryClick = (category) => {
    if (category.route === "travel-date") {
      setShowDatePicker(true);
    } else if (category.route === "add-destination") {
      setShowDestinationPicker(true);
      fetchAttractions();
    } else {
      const url = `/explore/${country}/${category.route}`;
      console.log(`Navigating to: ${url}`);
      navigate(url);
    }
  };

  const fetchAttractions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/attractions/country/${displayCountry}`);
      setAttractions(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    } finally {
      setLoading(false);
    }
  };

  const addDestination = (attraction) => {
    if (!selectedDestinations.find(dest => dest._id === attraction._id)) {
      const updatedDestinations = [...selectedDestinations, attraction];
      setSelectedDestinations(updatedDestinations);
      
      // Save to localStorage for View Plan
      const savedPlan = {
        country: displayCountry,
        destinations: updatedDestinations,
        travelDates: {
          startDate: startDate,
          endDate: endDate
        },
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('savedTripPlan', JSON.stringify(savedPlan));
    }
  };

  const removeDestination = (attractionId) => {
    const updatedDestinations = selectedDestinations.filter(dest => dest._id !== attractionId);
    setSelectedDestinations(updatedDestinations);
    
    // Update localStorage
    const savedPlan = {
      country: displayCountry,
      destinations: updatedDestinations,
      travelDates: {
        startDate: startDate,
        endDate: endDate
      },
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('savedTripPlan', JSON.stringify(savedPlan));
  };

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
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
          Day Plan for {displayCountry}!
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "40px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Plan your perfect day in {displayCountry}!
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ 
            color: "#34495e", 
            marginBottom: "30px",
            fontSize: "1.4rem",
            fontWeight: "600"
          }}>
            Choose Your Planning Option
          </h3>
          
                     <div style={{
             display: "grid",
             gridTemplateColumns: "repeat(2, 1fr)",
             gap: "20px",
             maxWidth: "500px",
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
          onClick={() => navigate(`/explore/${country}/trip-planner`)}
        >
          ← Back to Trip Planner
        </button>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "30px",
              maxWidth: "600px",
              width: "90%",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <h2 style={{ color: "#2c3e50", margin: 0 }}>Dates (optional)</h2>
                <button
                  onClick={() => setShowDatePicker(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#7f8c8d"
                  }}
                >
                  ×
                </button>
              </div>

                             {/* Date Input Fields */}
               <div style={{
                 display: "flex",
                 gap: "15px",
                 marginBottom: "25px"
               }}>
                 <div style={{ flex: 1 }}>
                   <label style={{ display: "block", marginBottom: "5px", color: "#34495e", fontWeight: "500" }}>
                     Start date
                   </label>
                   <input
                     type="date"
                     value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                     style={{
                       width: "100%",
                       padding: "12px",
                       border: "1px solid #ddd",
                       borderRadius: "8px",
                       fontSize: "14px"
                     }}
                   />
                 </div>
                 <div style={{ flex: 1 }}>
                   <label style={{ display: "block", marginBottom: "5px", color: "#34495e", fontWeight: "500" }}>
                     End date
                   </label>
                   <input
                     type="date"
                     value={endDate}
                     onChange={(e) => setEndDate(e.target.value)}
                     style={{
                       width: "100%",
                       padding: "12px",
                       border: "1px solid #ddd",
                       borderRadius: "8px",
                       fontSize: "14px"
                     }}
                   />
                 </div>
               </div>

                                                           {/* Clear Dates and Save Buttons */}
                <div style={{ textAlign: "center", display: "flex", gap: "15px", justifyContent: "center" }}>
                  <button
                    onClick={clearDates}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                  >
                    Clear dates
                  </button>
                  <button
                    onClick={() => {
                      // Save dates to localStorage
                      const savedPlan = {
                        country: displayCountry,
                        destinations: selectedDestinations,
                        travelDates: {
                          startDate: startDate,
                          endDate: endDate
                        },
                        savedAt: new Date().toISOString()
                      };
                      localStorage.setItem('savedTripPlan', JSON.stringify(savedPlan));
                      setShowDatePicker(false);
                    }}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                  >
                    Save
                  </button>
                </div>
             </div>
           </div>
         )}

         {/* Destination Picker Modal */}
         {showDestinationPicker && (
           <div style={{
             position: "fixed",
             top: 0,
             left: 0,
             width: "100vw",
             height: "100vh",
             backgroundColor: "rgba(0, 0, 0, 0.5)",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             zIndex: 1000
           }}>
                                                       <div style={{
                 backgroundColor: "white",
                 borderRadius: "15px",
                 padding: "30px",
                 maxWidth: "800px",
                 width: "90%",
                 maxHeight: "80vh",
                 overflow: "auto",
                 boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
               }}>
               <div style={{
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "center",
                 marginBottom: "20px"
               }}>
                 <h2 style={{ color: "#2c3e50", margin: 0 }}>Add Destinations</h2>
                 <button
                   onClick={() => setShowDestinationPicker(false)}
                   style={{
                     background: "none",
                     border: "none",
                     fontSize: "24px",
                     cursor: "pointer",
                     color: "#7f8c8d"
                   }}
                 >
                   ×
                 </button>
               </div>

               {loading ? (
                 <div style={{ textAlign: "center", padding: "40px" }}>
                   <p style={{ color: "#7f8c8d" }}>Loading attractions...</p>
                 </div>
               ) : (
                 <div>
                   {/* Selected Destinations */}
                   {selectedDestinations.length > 0 && (
                     <div style={{ marginBottom: "20px" }}>
                       <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Selected Destinations:</h3>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "10px"
                       }}>
                         {selectedDestinations.map(dest => (
                           <div key={dest._id} style={{
                             backgroundColor: "#e8f5e8",
                             padding: "8px 12px",
                             borderRadius: "20px",
                             display: "flex",
                             alignItems: "center",
                             gap: "8px",
                             border: "2px solid #4caf50"
                           }}>
                             <span style={{ fontSize: "14px", color: "#2c3e50" }}>{dest.name}</span>
                             <button
                               onClick={() => removeDestination(dest._id)}
                               style={{
                                 background: "none",
                                 border: "none",
                                 color: "#e74c3c",
                                 cursor: "pointer",
                                 fontSize: "16px",
                                 fontWeight: "bold"
                               }}
                             >
                               ×
                             </button>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* Available Attractions */}
                   <div>
                     <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>Available Attractions:</h3>
                     <div style={{
                       display: "grid",
                       gap: "15px"
                     }}>
                                               {attractions.map((attraction, index) => {
                          // Pastel gradient colors for each card
                          const gradients = [
                            "linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 100%)", // Soft pink
                            "linear-gradient(135deg, #E5F3FF 0%, #F0F8FF 100%)", // Soft blue
                            "linear-gradient(135deg, #E5FFE5 0%, #F0FFF0 100%)", // Soft green
                            "linear-gradient(135deg, #FFF5E5 0%, #FFF8F0 100%)", // Soft orange
                            "linear-gradient(135deg, #F0E5FF 0%, #F8F0FF 100%)", // Soft purple
                            "linear-gradient(135deg, #E5FFFF 0%, #F0FFFF 100%)"  // Soft cyan
                          ];
                          
                          return (
                                                         <div key={attraction._id} style={{
                               border: "1px solid #e0e0e0",
                               borderRadius: "12px",
                               padding: "15px",
                               display: "flex",
                               justifyContent: "space-between",
                               alignItems: "center",
                               background: gradients[index % gradients.length],
                               boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                               transition: "all 0.3s ease"
                             }}>
                               <div style={{ flex: 1 }}>
                                 <h4 style={{ 
                                   color: "#2c3e50", 
                                   margin: "0 0 6px 0",
                                   fontSize: "16px",
                                   fontWeight: "600"
                                 }}>
                                   {attraction.name}
                                 </h4>
                                 <div style={{ 
                                   display: "flex", 
                                   alignItems: "center", 
                                   gap: "15px",
                                   fontSize: "13px",
                                   color: "#7f8c8d"
                                 }}>
                                   <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                     <span style={{ color: "#e74c3c" }}>📍</span> {attraction.city}
                                   </span>
                                   <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                     <span style={{ color: "#f39c12" }}>⭐</span> {attraction.rating}/5
                                   </span>
                                 </div>
                               </div>
                                                                                              <button
                                   onClick={() => addDestination(attraction)}
                                   disabled={selectedDestinations.find(dest => dest._id === attraction._id)}
                                   style={{
                                     backgroundColor: selectedDestinations.find(dest => dest._id === attraction._id) ? "#ccc" : "#4caf50",
                                     color: "white",
                                     border: "none",
                                     borderRadius: "6px",
                                     padding: "6px 12px",
                                     fontSize: "12px",
                                     fontWeight: "600",
                                     cursor: selectedDestinations.find(dest => dest._id === attraction._id) ? "not-allowed" : "pointer",
                                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                     transition: "all 0.3s ease"
                                   }}
                                 onMouseOver={(e) => {
                                   if (!selectedDestinations.find(dest => dest._id === attraction._id)) {
                                     e.target.style.transform = "translateY(-2px)";
                                     e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
                                   }
                                 }}
                                 onMouseOut={(e) => {
                                   if (!selectedDestinations.find(dest => dest._id === attraction._id)) {
                                     e.target.style.transform = "translateY(0)";
                                     e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                                   }
                                 }}
                               >
                                 {selectedDestinations.find(dest => dest._id === attraction._id) ? "Saved ✓" : "Save"}
                               </button>
                            </div>
                          );
                        })}
                     </div>
                   </div>
                 </div>
               )}
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default DayPlanPage;
