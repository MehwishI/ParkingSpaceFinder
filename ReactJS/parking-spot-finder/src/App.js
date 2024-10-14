import Loader from 'components/LoaderContainer/Loader';
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

function App() {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Loader />} />
        <Route path='/login' element={<Login />} />
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
