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
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MapDirection from "components/MapDirection/MapDirection";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [isHome, setisHome] = useState(true);
  // const [isProfile, setisProfile] = useState(false);
  // const [isHistory, setisHistory] = useState(false);

  if (isLoading) {
    return <div><Loader /></div>;
  }
  // console.log("Top:", TopNavigationBar);
  //console.log("typeof topnavigation", typeof TopNavigationBar);

  return (
    <Router>
      <div>
        {isHome && (
          <div className="homecontainer">
            <Home />
          </div>
        )}
        {isHistory && (
          <div>
            <ParkingHistory />
          </div>
        )}
        {isProfile && (
          <div>
            <Profile />
          </div>
        )}
        {/* footer begins */}
        <Footer />
      </div>
      <Routes>
        {/* <Route path="/loader" element={<Loader />} /> */}
        <Route path="/login" element={<Login />} />
        <Route exact path="/profile" Component={Profile} />
        <Route path="/locationresult" element={<LocationResult />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/parkinghistory" element={<ParkingHistory />} />
        <Route path="/mapdirection" element={<MapDirection />} />
      </Routes>
    </Router>
  );
}

export default App;
