import "./App.css";
import SearchFilterSection from "./Components/SearchFilterSection";
import DrinkDetailPage from "./Pages/DrinkDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          {/* Main title */}
          <h1>Pour Me a Glass, Please!</h1>
          {/* Setting up routes */}
          <Routes>
            {/* Route for the main search and filter section */}
            <Route
              path="/"
              element={<SearchFilterSection></SearchFilterSection>}
            ></Route>
            {/* Route for individual drink detail page */}
            <Route
              path="/:drinkId"
              element={<DrinkDetailPage></DrinkDetailPage>}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
