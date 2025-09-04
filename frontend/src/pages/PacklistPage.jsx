import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PacklistPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get user from localStorage on component mount
  useEffect(() => {
    const getUserFromStorage = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setUserId(parsedUser.id);
        } else {
          // If no user is logged in, redirect to home or show message
          setMessage('Please log in to use the packlist feature.');
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setMessage('Error loading user data. Please log in again.');
      }
    };

    getUserFromStorage();
  }, [navigate]);

  // Load existing packlist when userId is available
  useEffect(() => {
    if (userId) {
      loadPacklist();
    }
  }, [userId]);

  const loadPacklist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/packlist/${userId}`);
      if (response.data.success) {
        setItems(response.data.data.items || []);
      }
    } catch (error) {
      // If no packlist exists, start with empty array
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    if (newItem.trim()) {
      const item = {
        name: newItem.trim(),
        category: 'General',
        quantity: 1,
        packed: false
      };
      setItems([...items, item]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const togglePacked = (index) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, packed: !item.packed } : item
    );
    setItems(updatedItems);
  };

  const savePacklist = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.post('http://localhost:5000/api/packlist', {
        userId,
        items,
        title: `${user?.name || 'User'}'s Packing List for ${displayCountry}`
      });

      if (response.data.success) {
        setMessage('Packlist saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving packlist. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const clearPacklist = () => {
    setItems([]);
    setMessage('Packlist cleared!');
    setTimeout(() => setMessage(''), 3000);
  };

  const displayCountry = country ? country.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : 'Your Destination';

  // Show loading or redirect message if no user
  if (!user && !userId) {
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
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
            {message || 'Loading...'}
          </h2>
          {message && (
            <p style={{ color: "#7f8c8d" }}>
              Redirecting to home page...
            </p>
          )}
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
        maxWidth: "800px",
        padding: "40px 20px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        width: "90%"
      }}>
        <h1 style={{ 
          color: "#2c3e50", 
          marginBottom: "20px",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
          🎒 {user?.name ? `${user.name}'s` : 'Your'} Packlist for {displayCountry}
        </h1>

        <p style={{ 
          color: "#7f8c8d", 
          marginBottom: "30px",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Add items to your packing list and keep track of what you need to bring!
        </p>

        {/* Add Item Section */}
        <div style={{ 
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "15px",
          border: "2px solid #e9ecef"
        }}>
          <h3 style={{ 
            color: "#34495e", 
            marginBottom: "15px",
            fontSize: "1.4rem",
            fontWeight: "600"
          }}>
            Add New Item
          </h3>
          
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item name (e.g., toothbrush, camera, passport)"
              style={{
                flex: 1,
                padding: "12px 15px",
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498db"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <button
              onClick={addItem}
              style={{
                padding: "12px 20px",
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#229954"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#27ae60"}
            >
              Add
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "1rem",
            backgroundColor: message.includes('successful') ? "#d4edda" : "#f8d7da",
            color: message.includes('successful') ? "#155724" : "#721c24",
            border: `1px solid ${message.includes('successful') ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {message}
          </div>
        )}

        {/* Items List */}
        <div style={{ 
          marginBottom: "30px",
          maxHeight: "400px",
          overflowY: "auto"
        }}>
          <h3 style={{ 
            color: "#34495e", 
            marginBottom: "15px",
            fontSize: "1.4rem",
            fontWeight: "600"
          }}>
            Your Packing List ({items.length} items)
          </h3>
          
          {items.length === 0 ? (
            <div style={{
              padding: "40px",
              textAlign: "center",
              color: "#7f8c8d",
              fontSize: "1.1rem"
            }}>
              No items added yet. Start adding items to your packing list!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    backgroundColor: item.packed ? "#d4edda" : "white",
                    borderRadius: "10px",
                    border: `2px solid ${item.packed ? "#c3e6cb" : "#e0e0e0"}`,
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => togglePacked(index)}
                    style={{
                      marginRight: "15px",
                      transform: "scale(1.2)",
                      cursor: "pointer"
                    }}
                  />
                  <span style={{
                    flex: 1,
                    fontSize: "1.1rem",
                    textDecoration: item.packed ? "line-through" : "none",
                    color: item.packed ? "#6c757d" : "#2c3e50",
                    fontWeight: "500"
                  }}>
                    {item.name}
                  </span>
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#c0392b"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#e74c3c"}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: "flex", 
          gap: "15px", 
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button
            onClick={savePacklist}
            disabled={loading || items.length === 0}
            style={{
              padding: "15px 30px",
              backgroundColor: loading || items.length === 0 ? "#bdc3c7" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading || items.length === 0 ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseOver={(e) => {
              if (!loading && items.length > 0) e.currentTarget.style.backgroundColor = "#2980b9";
            }}
            onMouseOut={(e) => {
              if (!loading && items.length > 0) e.currentTarget.style.backgroundColor = "#3498db";
            }}
          >
            {loading ? 'Saving...' : 'Save Packlist'}
          </button>

          <button
            onClick={clearPacklist}
            disabled={items.length === 0}
            style={{
              padding: "15px 30px",
              backgroundColor: items.length === 0 ? "#bdc3c7" : "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: items.length === 0 ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseOver={(e) => {
              if (items.length > 0) e.currentTarget.style.backgroundColor = "#c0392b";
            }}
            onMouseOut={(e) => {
              if (items.length > 0) e.currentTarget.style.backgroundColor = "#e74c3c";
            }}
          >
            Clear All
          </button>
        </div>

        {/* Back Button */}
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
          onClick={() => navigate(`/explore/${country}`)}
        >
          ← Back to Explore
        </button>
      </div>
    </div>
  );
};

export default PacklistPage;
