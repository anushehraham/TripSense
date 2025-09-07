import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LocalPhrasePage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    const fetchPhrases = async () => {
      try {
        setLoading(true);
        console.log(`Fetching local phrases for country: ${country}`);
        
        // Fetch from your MongoDB localphrase collection
        const response = await axios.get(`http://localhost:5000/api/localphrase/country/${country}`);
        console.log("Local phrases data received:", response.data);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setPhrases(response.data);
          setError(null);
          console.log("Phrases set successfully:", response.data);
        } else {
          console.log("No phrases found or invalid data structure");
          setError(`No local phrases found for ${displayCountry}. Please check back later!`);
          setPhrases([]);
        }
      } catch (err) {
        console.error("Error fetching local phrases:", err);
        
        if (err.code === 'ERR_NETWORK') {
          setError(`Network error: Cannot connect to server. Please make sure your backend is running on port 5000.`);
        } else if (err.response?.status === 404) {
          setError(`No local phrases found for ${displayCountry}. Please add some phrases to your database first.`);
        } else if (err.response?.status === 500) {
          setError(`Server error: ${err.response.data?.message || 'Unknown server error'}`);
        } else {
          setError(`Failed to load local phrases for ${displayCountry}. Error: ${err.message}`);
        }
        setPhrases([]);
      } finally {
        setLoading(false);
      }
    };

    if (country) {
      fetchPhrases();
    }
  }, [country, displayCountry]);

  // Filter phrases based on search term
  const filteredPhrases = phrases.filter(phrase =>
    phrase.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phrase.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phrase.usage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ 
          textAlign: "center",
          color: "white",
          fontSize: "1.5rem"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🗣️</div>
          Loading local phrases for {displayCountry}...
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
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          🗣️ Local Language Phrases in {displayCountry}
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "40px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Learn essential phrases to communicate with locals in {displayCountry}!
        </p>

        {/* Search Bar */}
        <div style={{
          marginBottom: "30px",
          maxWidth: "500px",
          margin: "0 auto 30px auto"
        }}>
          <input
            type="text"
            placeholder="Search phrases, translations, or usage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 20px",
              fontSize: "16px",
              border: "2px solid #e0e0e0",
              borderRadius: "25px",
              outline: "none",
              transition: "border-color 0.3s ease",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
          />
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

        {filteredPhrases.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "25px",
            marginTop: "30px"
          }}>
            {filteredPhrases.map((phrase, index) => (
              <div
                key={phrase._id || index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  padding: "25px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "2px solid transparent"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(102, 126, 234, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Phrase in Local Language */}
                <div style={{
                  textAlign: "center",
                  marginBottom: "20px"
                }}>
                  <h2 style={{ 
                    color: "#667eea", 
                    marginBottom: "10px",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "serif"
                  }}>
                    {phrase.phrase}
                  </h2>
                  <div style={{
                    width: "60px",
                    height: "3px",
                    backgroundColor: "#667eea",
                    margin: "0 auto",
                    borderRadius: "2px"
                  }}></div>
                </div>

                {/* Translation */}
                <div style={{
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  textAlign: "center"
                }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    marginBottom: "8px",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                  }}>
                    Translation
                  </h3>
                  <p style={{ 
                    color: "#495057", 
                    fontSize: "1.2rem",
                    fontWeight: "500"
                  }}>
                    {phrase.translation}
                  </p>
                </div>

                {/* Usage */}
                {phrase.usage && (
                  <div style={{
                    backgroundColor: "#e3f2fd",
                    padding: "15px",
                    borderRadius: "12px",
                    marginBottom: "15px"
                  }}>
                    <h4 style={{ 
                      color: "#1976d2", 
                      marginBottom: "8px",
                      fontSize: "1rem",
                      fontWeight: "600"
                    }}>
                      💡 Usage
                    </h4>
                    <p style={{ 
                      color: "#1976d2", 
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      margin: 0
                    }}>
                      {phrase.usage}
                    </p>
                  </div>
                )}

                {/* Practice button removed per request */}
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div style={{ 
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "30px"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🔍</div>
            No phrases found matching "{searchTerm}"
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
            No local phrases found to display
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "40px",
          flexWrap: "wrap"
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

export default LocalPhrasePage;
