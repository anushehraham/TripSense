import React from "react";
import SearchBar from "./SearchBar";
import "./HeroSection.css";


const HeroSection = () => {
  return (
    <section className="hero">
      <h1>One app for all your travel planning needs</h1>
      <p>
        Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one place.
      </p>
      <SearchBar />
    </section>
  );
};


export default HeroSection;


