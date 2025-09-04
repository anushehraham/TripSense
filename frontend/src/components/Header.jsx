import React, { useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import "./Header.css";

const Header = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="header">
        <div className="logo">TripSense</div>
        <nav>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="login"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Log in
          </button>
          <button 
            onClick={() => setShowSignupModal(true)}
            className="signup"
            style={{
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Sign up
          </button>
        </nav>
      </header>
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)} 
      />
    </>
  );
};

export default Header;
