import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

const Login = () => {
  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("login hello");
    
  });

  const getHandleLogin = async () => {
    console.log("before logging in...");
    
    await loginWithRedirect();
  };

  const gethandleLabelClick = () => {
    navigate('/register');
  };

  return (
    <>
      <div>Login</div>
      <button onClick={getHandleLogin}>Login</button><br></br>
      <label onClick={gethandleLabelClick} style={{ cursor: 'pointer', color: 'blue'}}>Please signup here</label>
    </>
  );
};

export default Login;
