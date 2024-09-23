import { View, Text, SafeAreaView, Button } from 'react-native';
import React from 'react';
// import auth0 from 'auth0-js';
import Auth0 from 'react-native-auth0';

const auth0Client = new Auth0({
  domain: 'dev-yu5loj22bbugaxrq.us.auth0.com',
  clientId: 'UzULQhvlGuLveXufyJGFJlnvEMwYK8qo',
});

const Home = () => {

  const login = () => {
    auth0Client.webAuth
      .authorize({
        scope: 'openid profile email',
        redirectUri: 'com.ParkingSpaceFinderFront.auth0://dev-yu5loj22bbugaxrq.us.auth0.com/android/ParkingSpaceFinderFront/callback' // Adjust this as necessary
      })
      .then(credentials => {
        // console.log('Access Token:', credentials.accessToken);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  return (
    <SafeAreaView>
      <Text>Welcome to the Home page of ParkSmart app</Text>
      <Button title="Login" onPress={login} />
    </SafeAreaView>
  )
}

export default Home