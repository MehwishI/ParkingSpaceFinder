import axios from "axios";

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const getGoogleCoordinates = async (getplaceid) => {
  try {
    console.log("before coordinates...", getplaceid);
    
    const getCoordinates = await axios.post(`${getBaseApi}/googlecoordinates`, {
      placeid: getplaceid,
    });

    console.log("halos",getCoordinates.data);
    

    return getCoordinates.data;
  } catch (error) {
    return error;
  }
};

export { getGoogleCoordinates };
