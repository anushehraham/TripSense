import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/signup/login', formData);
      
      if (response.data.success) {
        setMessage('Login successful! Welcome back!');
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Clear form
        setFormData({ email: '', password: '' });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setMessage('');
          // Optionally redirect or update UI to show logged in state
          window.location.reload(); // Simple way to update the UI
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', password: '' });
    setMessage('');
    onClose();
  };

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
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        maxWidth: '400px',
        width: '90%',
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
            color: '#7f8c8d'
          }}
        >
          ×
        </button>

        {/* Title */}
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '10px',
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Log in
        </h2>

        {/* Subtitle */}
        <p style={{
          color: '#7f8c8d',
          marginBottom: '30px',
          fontSize: '1rem',
          textAlign: 'center'
        }}>
          Log in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#34495e',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: 'none',
                borderBottom: '2px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backgroundColor: 'transparent'
              }}
              onFocus={(e) => e.target.style.borderBottomColor = '#3498db'}
              onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#34495e',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: 'none',
                borderBottom: '2px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backgroundColor: 'transparent'
              }}
              onFocus={(e) => e.target.style.borderBottomColor = '#3498db'}
              onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
            />
          </div>

          {/* Message Display */}
          {message && (
            <div style={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '0.9rem',
              backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
              color: message.includes('successful') ? '#155724' : '#721c24',
              border: `1px solid ${message.includes('successful') ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#2980b9';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#3498db';
            }}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
