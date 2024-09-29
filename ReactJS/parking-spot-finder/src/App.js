import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Authentication/Login';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Logout from './components/Authentication/Logout';
import AISuggestion from './components/AISuggestion/AISuggestion';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div>
        <h3>Smart Park Login</h3>

        {isAuthenticated ? (
          <>
          Hi {user.given_name}, Welcome to Smart Park!
          {/* <Logout /> */}
          <br></br>
          <AISuggestion />
          </>
        ) : (
          <>
            <Login />
            <>You are not logged in yet</>
          </>
        )}
      </div>
      <Routes>
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
