
import axios from 'axios';

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const locResultSearch = async () => {
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