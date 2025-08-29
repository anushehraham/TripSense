import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import ExplorePage from "./pages/ExplorePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore/:countryName" element={<ExplorePage />} />
        <Route path="/destination/:name" element={<DestinationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
