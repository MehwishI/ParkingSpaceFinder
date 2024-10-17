import Loader from "components/LoaderContainer/Loader";
import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Login from "components/Authentication/Login";
import Profile from "components/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from "components/Authentication/Logout";
import LocationResult from "components/LocationResult/LocationResult";
import Home from "components/Home/Home";
import Register from "components/Authentication/Register";
import ParkingHistory from "components/ParkingHistory/ParkingHistory";
import Footer from "components/Footer/Footer";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [isHome, setisHome] = useState(true);
  // const [isProfile, setisProfile] = useState(false);
  // const [isHistory, setisHistory] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  

  return (
    <Router>
      <div>
        <div className="homecontainer"></div>

        {/* footer begins */}
        <Footer />
      </div>
      <Routes>
        <Route exact path="/" element={<Loader />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/profile" Component={Profile} />
        <Route path="/locationresult" element={<LocationResult />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/parkinghistory" element={<ParkingHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
