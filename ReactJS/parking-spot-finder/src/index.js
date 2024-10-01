import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const getDomain = process.env.REACT_APP_AUTH0_DOMAIN;
const getClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const gglMapsapiBaseUrl = process.env.REACT_APP_GOOGLE_API_BASE_URL;
const gglMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// const loadGoogleMapsScript = () => {
//   const script = document.createElement('script');
//   script.src =`${gglMapsapiBaseUrl}/js?key=${gglMapsApiKey}&libraries=places`;
//   script.async = true;
//   script.defer = true;
//   document.bofy.appendChild(script);
// };

// window.onload = () => {
//   loadGoogleMapsScript();
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={getDomain}
      clientId={getClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
