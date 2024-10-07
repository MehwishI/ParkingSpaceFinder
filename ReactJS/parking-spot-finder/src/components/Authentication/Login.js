import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUserProfileData } from "services/userProfileDataService";

const Login = () => {
  const { loginWithRedirect, user } = useAuth0();

  const getHandleLogin = async () => {
    await loginWithRedirect();

    const userData = {
      userid: user.sub, //userid
      userFirstName: user.given_name,
      userLastName: user.family_name,
      userEmail: user.email,
    };
    //call service  after successful sign up /
    const response = saveUserProfileData(userData);
    console.log("saved user: ", response.data);
  };

  //if()
  //call a service ,post api
  //save user info to db

  return (
    <>
      <div>Login</div>
      <button onClick={getHandleLogin}>Login</button>
    </>
  );
};

export default Login;
