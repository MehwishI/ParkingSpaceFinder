import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "components/Authentication/Login";
import Profile from "components/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from "components/Authentication/Logout";
import LocationResult from "components/LocationResult/LocationResult";
import Home from "components/Home/Home";
import Register from "components/Authentication/Register";
import TopNavigationBar from "components/TopNavigationBar/TopNavigationBar";
import ParkingHistory from "components/ParkingHistory/ParkingHistory";
import { useState } from "react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isHome, setisHome] = useState(true);
  const [isProfile, setisProfile] = useState(false);
  const [isHistory, setisHistory] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log("Top:", TopNavigationBar);
  //console.log("typeof topnavigation", typeof TopNavigationBar);

  return (
    <Router>
      <div>
        <TopNavigationBar />

        {isHome && (
          <div className="homecontainer">
            <Home />
          </div>
        )}
      </div>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/locationresult" element={<LocationResult />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ParkingHistory" element={<ParkingHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
