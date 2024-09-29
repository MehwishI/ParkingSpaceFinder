
import axios from 'axios';

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const locResultSearch = async () => {
    try {
        const getLocRes = await axios.post(`${getBaseApi}/wpatimelimit`);
        
        return getLocRes.data;
    
      } catch (error) {
        console.error('Error getting location result', error);
        return error;
      }
};

const locAllResultSearch = async () => {
  try {
    const getAllLocRes = await axios.post(`${getBaseApi}/wpapaystation`);
    
    return getAllLocRes.data;

  } catch (error) {
    console.error('Error getting location result', error);
    return error;
  }
};

export { locResultSearch, locAllResultSearch }