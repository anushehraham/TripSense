
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import ExplorePage from "./pages/ExplorePage";
import TravelGuidePage from "./pages/TravelGuidePage";
import AttractionsPage from "./pages/AttractionsPage";
import FoodPage from "./pages/FoodPage";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HeroSection />
          </>
        } />
        <Route path="/explore/:country" element={<ExplorePage />} />
        <Route path="/explore/:country/travel-guide" element={<TravelGuidePage />} />
        <Route path="/explore/:country/attractions" element={<AttractionsPage />} />
        <Route path="/explore/:country/food" element={<FoodPage />} />
        <Route path="/destination/:name" element={<DestinationPage />} />
        <Route path="/home" element={
          <>
            <Header />
            <HomePage />
          </>
        } />

        {/* fallback route */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              Page Not Found
            </h2>
          }
        />
      </Routes>
    </div>
  );
}

export default App;





