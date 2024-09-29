//import { View, Text , } from 'react-native'
import React, {Button} from 'react';

import DropdownList from './DropdownList';
import { getParkingData } from "helpers/getParkingData";



const SearchContainer = () => {

  //Get parking data
  const getData = async () => {
    const parkingData =  await getParkingData();
    console.log("All Parking Data:", parkingData)

   }


  // const handleSearchClick=  () => {
  //   getData();

  // }


  return (
    <div>
    <DropdownList />
    <Button id="Searchbtn" onClick={()=> getData} name="Click to Search" />
     
    </div>
  )
}

export default SearchContainer