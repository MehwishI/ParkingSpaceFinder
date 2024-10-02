
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";


const getBaseApi = process.env.REACT_APP_BASE_URL_API;
 const { getAccessTokenSilently } = useAuth0();

const locResultSearch = async () => {
 
  
  const authtoken = await getAccessTokenSilently();

    try {
        console.log("Before location result...");
        
      const getLocRes = await axios.post(`${getBaseApi}/wpatimelimit`, {
        headers: 
         'Authorization': `Bearer ${authtoken}`
          
        });

        console.log(getLocRes.data);
        
        
        return getLocRes.data;
    
      } catch (error) {
        console.error('Error getting location result', error);
        return error;
      }
};

const locAllResultSearch = async () => {
  try {
    console.log(getBaseApi);
    
    const getAllLocRes = await axios.get(`${getBaseApi}/wpapaystation`, {
      headers:
        'Authorization': `Bearer ${authtoken}`
          
        });


    console.log("my data",getAllLocRes);
    
    return getAllLocRes.data;

  } catch (error) {
    console.error('Error getting location result', error);
    return error;
  }
};

export { locResultSearch, locAllResultSearch }