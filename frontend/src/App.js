import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import ExplorePage from "./pages/ExplorePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* ✅ unified param name */}
      <Route path="/explore/:country" element={<ExplorePage />} />
      <Route path="/destination/:name" element={<DestinationPage />} />

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
  );
}

export default App;
