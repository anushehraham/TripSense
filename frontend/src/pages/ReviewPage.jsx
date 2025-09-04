import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    user: '',
    rating: 5,
    title: '',
    comment: ''
  });

  const displayCountry = country ? country.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : 'Your Destination';

  // Load reviews and stats on component mount
  useEffect(() => {
    loadReviews();
    loadStats();
  }, [country]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/reviews/country/${country}`);
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      setMessage('Error loading reviews');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/stats/${country}`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.user || !formData.title || !formData.comment) {
      setMessage('Please fill in all fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/reviews', {
        country: country,
        ...formData
      });

      if (response.data.success) {
        setMessage('Review submitted successfully!');
        setFormData({ user: '', rating: 5, title: '', comment: '' });
        setShowForm(false);
        loadReviews();
        loadStats();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage('Error submitting review. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleRateReview = async (reviewId, helpful) => {
    try {
      await axios.post(`http://localhost:5000/api/reviews/${reviewId}/rate`, { helpful });
      loadReviews();
    } catch (error) {
      console.error('Error rating review:', error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : '#ddd' }}>
        ★
      </span>
    ));
  };

  const renderRatingDistribution = () => {
    if (!stats || !stats.ratingDistribution) return null;
    
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map(rating => (
          <div key={rating} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <span style={{ width: '20px', color: '#2c3e50' }}>{rating}★</span>
            <div style={{ 
              flex: 1, 
              height: '20px', 
              backgroundColor: '#ecf0f1', 
              margin: '0 10px',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                backgroundColor: '#3498db',
                width: `${(stats.ratingDistribution[rating] / stats.totalReviews) * 100}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <span style={{ color: '#7f8c8d', fontSize: '14px' }}>
              {stats.ratingDistribution[rating] || 0}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
        maxWidth: "1000px",
        padding: "40px 20px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        width: "90%",
        maxHeight: "90vh",
        overflow: "auto"
      }}>
        <h1 style={{ 
          color: "#2c3e50", 
          marginBottom: "20px",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
          📝 Reviews for {displayCountry}
        </h1>

        {/* Stats Section */}
        {stats && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "15px",
            border: "2px solid #e9ecef"
          }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#2c3e50", marginBottom: "5px" }}>Total Reviews</h3>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3498db" }}>
                {stats.totalReviews}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#2c3e50", marginBottom: "5px" }}>Average Rating</h3>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#e74c3c" }}>
                {stats.averageRating}/5
              </div>
              <div style={{ fontSize: "1.2rem", color: "#7f8c8d" }}>
                {renderStars(Math.round(stats.averageRating))}
              </div>
            </div>
          </div>
        )}

        {/* Rating Distribution */}
        {renderRatingDistribution()}

        {/* Write Review Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            marginBottom: "20px",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2980b9"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3498db"}
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>

        {/* Review Form */}
        {showForm && (
          <div style={{
            marginBottom: "30px",
            padding: "25px",
            backgroundColor: "#f8f9fa",
            borderRadius: "15px",
            border: "2px solid #e9ecef"
          }}>
            <h3 style={{ color: "#2c3e50", marginBottom: "20px" }}>Write Your Review</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.user}
                  onChange={(e) => setFormData({...formData, user: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                  placeholder="Enter your name"
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>
                  Rating
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                  <option value={2}>2 Stars - Fair</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>
                  Review Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                  placeholder="Give your review a title"
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50" }}>
                  Your Review
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    height: "100px",
                    resize: "vertical"
                  }}
                  placeholder="Share your experience..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  backgroundColor: loading ? "#bdc3c7" : "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "600"
                }}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div style={{
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "16px",
            backgroundColor: message.includes('success') ? "#d4edda" : "#f8d7da",
            color: message.includes('success') ? "#155724" : "#721c24",
            border: `1px solid ${message.includes('success') ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {message}
          </div>
        )}

        {/* Reviews List */}
        <div style={{ textAlign: "left" }}>
          <h3 style={{ color: "#2c3e50", marginBottom: "20px" }}>Recent Reviews</h3>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              padding: "40px", 
              color: "#7f8c8d",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px"
            }}>
              No reviews yet. Be the first to share your experience!
            </div>
          ) : (
            reviews.map((review, index) => (
              <div key={review._id || index} style={{
                marginBottom: "20px",
                padding: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "2px solid #e9ecef",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div>
                    <h4 style={{ color: "#2c3e50", margin: "0 0 5px 0" }}>{review.title}</h4>
                    <p style={{ color: "#7f8c8d", margin: "0", fontSize: "14px" }}>by {review.user}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "18px", color: "#f39c12" }}>
                      {renderStars(review.rating)}
                    </div>
                    <p style={{ color: "#7f8c8d", margin: "5px 0 0 0", fontSize: "12px" }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <p style={{ 
                  color: "#2c3e50", 
                  lineHeight: "1.6", 
                  margin: "0 0 15px 0" 
                }}>
                  {review.comment}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleRateReview(review._id, true)}
                    style={{
                      padding: "5px 10px",
                      fontSize: "12px",
                      backgroundColor: "#27ae60",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    👍 Helpful ({review.helpful || 0})
                  </button>
                  <button
                    onClick={() => handleRateReview(review._id, false)}
                    style={{
                      padding: "5px 10px",
                      fontSize: "12px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    👎 Not Helpful ({review.notHelpful || 0})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back Button */}
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
            marginTop: "20px",
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

export default ReviewPage;
