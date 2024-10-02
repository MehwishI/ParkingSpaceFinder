import axios from 'axios';

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const getGoogleAutocomplete = async (getInput) => {
    try {
        const getAutocomData = await axios.post(`${getBaseApi}/googleautocomplete`,{
            address: getInput
        });

        return getAutocomData.data;

    } catch (error) {
        return error;
    }
};

export { getGoogleAutocomplete };