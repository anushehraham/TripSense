
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import ExplorePage from "./pages/ExplorePage";
import TravelGuidePage from "./pages/TravelGuidePage";
import AttractionsPage from "./pages/AttractionsPage";
import FoodPage from "./pages/FoodPage";
import LocalPhrasePage from "./pages/LocalPhrasePage";
import BestTimePage from "./pages/BestTimePage";
import CulturePage from "./pages/CulturePage";
import BudgetEstimatorPage from "./pages/BudgetEstimatorPage";
import TripPlannerPage from "./pages/TripPlannerPage";
import DayPlanPage from "./pages/DayPlanPage";
import ViewPlanPage from "./pages/ViewPlanPage";
import PacklistPage from "./pages/PacklistPage";
import ReviewPage from "./pages/ReviewPage";
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
        <Route path="/explore/:country/trip-planner" element={<TripPlannerPage />} />
        <Route path="/explore/:country/day-plan" element={<DayPlanPage />} />
        <Route path="/explore/:country/view-plan" element={<ViewPlanPage />} />
        <Route path="/explore/:country/attractions" element={<AttractionsPage />} />
        <Route path="/explore/:country/food" element={<FoodPage />} />
        <Route path="/explore/:country/localphrase" element={<LocalPhrasePage />} />
        <Route path="/explore/:country/besttime" element={<BestTimePage />} />
        <Route path="/explore/:country/culture" element={<CulturePage />} />
        <Route path="/explore/:country/budget-estimator" element={<BudgetEstimatorPage />} />
        <Route path="/explore/:country/packlist" element={<PacklistPage />} />
        <Route path="/explore/:country/review" element={<ReviewPage />} />
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





