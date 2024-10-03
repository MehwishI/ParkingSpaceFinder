
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";


const getBaseApi = process.env.REACT_APP_BASE_URL_API;
 const { getAccessTokenSilently } = useAuth0();

const locResultSearch = async () => {
 
  
  const authtoken = await getAccessTokenSilently();

    try {
        const getLocRes = await axios.post(`${getBaseApi}/wpatimelimit`);

        console.log(getLocRes.data);
        
        
        return getLocRes.data;
    
      } catch (error) {
        console.error('Error getting location result', error);
        return error;
      }
};

const locAllResultSearch = async () => {
  try {
    const getAllLocRes = await axios.get(`${getBaseApi}/wpapaystation`);
    
    return getAllLocRes.data;

  } catch (error) {
    console.error('Error getting location result', error);
    return error;
  }
};

const locResultForCoord = async (coordPoints) => {
  const getLocCoRes = await axios.post(`${getBaseApi}/wpalocation`, {
    latitude: coordPoints.lat,
    longitude: coordPoints.lng
  });

  console.log('COORDINATE DATA', getLocCoRes.data);

  return getLocCoRes.data;
};

export { locResultSearch, locAllResultSearch, locResultForCoord }