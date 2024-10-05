import axios from 'axios'

import { userDataService } from "../services/userDataService";
import { userParkingService } from "../services/userParkingService";









const getUserData = async () {
  const data = await axios.get('/api/user');

}

const saveUserData = async (userData) {

  await axios.post('/api/user');
}

const getUserParkingData = async() => {

  await data = await.get('/api/user/parking')
}

const saveUserParkingData = async (userParkingData) {

  await axios.post('/api/user');
}
