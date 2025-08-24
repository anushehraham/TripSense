import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">TripSense</div>
      <nav>
        <a href="/login" className="login">Log in</a>
        <a href="/signup" className="signup">Sign up</a>
      </nav>
    </header>
  );
};

export default Header;
