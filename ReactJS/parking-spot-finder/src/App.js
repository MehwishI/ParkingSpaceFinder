import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Authentication/Login';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logout from './components/Authentication/Logout';
import LocationResult from './components/LocationResult/LocationResult';
import Home from './components/Home/Home';
import Register from 'components/Authentication/Register';
import Loader from 'components/LoaderContainer/Loader';

function App() {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Router>
      {/* <div>
        {isAuthenticated ? (
          <div>
            <Home />
          </div>
        ) : (
          <>
            <Login />
            <>You are not logged in yet</>
          </>
        )}
      </div> */}
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/locationresult' element={<LocationResult />} />
        <Route path='/' element={<Loader />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
