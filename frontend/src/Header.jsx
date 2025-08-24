import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // optional for extra styles

function Header() {
  return (
    <header className="navbar">
      <div className="logo">TripSense</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
      </nav>
    </header>
  );
}

export default Header;
