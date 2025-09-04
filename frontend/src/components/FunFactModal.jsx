import React, { useState } from 'react';
import axios from 'axios';

const FunFactModal = ({ isOpen, onClose, country }) => {
  const [funFact, setFunFact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const displayCountry = country ? country.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : 'Your Destination';

  const getFunFact = async () => {
    if (!country) return;
    
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:5000/api/funfacts/random/${country}`);
      
      if (response.data.success) {
        setFunFact(response.data.data);
      } else {
        setError(response.data.message || 'No fun fact found for this country');
      }
    } catch (err) {
      console.error('Error fetching fun fact:', err);
      setError('Error loading fun fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFunFact(null);
    setError('');
    onClose();
  };

  const handleGetAnother = () => {
    setFunFact(null);
    setError('');
    getFunFact();
  };

  // Load fun fact when modal opens
  React.useEffect(() => {
    if (isOpen && country) {
      getFunFact();
    }
  }, [isOpen, country]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#7f8c8d',
            padding: '5px'
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{
            color: '#2c3e50',
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: '0 0 10px 0'
          }}>
            🎉 Fun Fact About {displayCountry}
          </h2>
          <p style={{
            color: '#7f8c8d',
            fontSize: '1.1rem',
            margin: 0
          }}>
            Discover something amazing about this destination!
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#3498db',
            fontSize: '1.2rem'
          }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }}></div>
            <div>Loading fun fact...</div>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#e74c3c',
            backgroundColor: '#fdf2f2',
            borderRadius: '15px',
            border: '2px solid #fecaca'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>😔</div>
            <h3 style={{ color: '#721c24', marginBottom: '10px' }}>Oops!</h3>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        ) : funFact ? (
          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            border: '2px solid #e9ecef'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🤯</div>
            <p style={{
              fontSize: '1.3rem',
              lineHeight: '1.6',
              color: '#2c3e50',
              margin: '0 0 20px 0',
              fontStyle: 'italic'
            }}>
              "{funFact.funFact}"
            </p>
            <div style={{
              fontSize: '0.9rem',
              color: '#7f8c8d',
              fontStyle: 'italic'
            }}>
              Fun fact about {funFact.country}
            </div>
          </div>
        ) : null}

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          marginTop: '30px'
        }}>
          {funFact && (
            <button
              onClick={handleGetAnother}
              style={{
                padding: '12px 25px',
                fontSize: '16px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
            >
              🎲 Get Another Fact
            </button>
          )}
          
          <button
            onClick={handleClose}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#34495e',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
          >
            Close
          </button>
        </div>

        {/* CSS for loading animation */}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FunFactModal;
