
import axios from 'axios';

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const locResultSearch = async () => {
    try {
        console.log("Before location result...");
        
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
    console.log(getBaseApi);
    
    const getAllLocRes = await axios.get(`${getBaseApi}/wpapaystation`);
    console.log("my data",getAllLocRes);
    
    return getAllLocRes.data;

  } catch (error) {
    console.error('Error getting location result', error);
    return error;
  }
};

export { locResultSearch, locAllResultSearch }