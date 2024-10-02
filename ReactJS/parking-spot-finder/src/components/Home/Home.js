import React, { useState } from 'react'
import Search from '../Search/Search'
import MapContainer from '../MapContainer/MapContainer'

const Home = () => {
  const [ getWpaSearchRes, setWpaSearchRes ] = useState([]);

  const getHandleDataChange = (resData) => {
    setWpaSearchRes(resData);
    console.log("result oil",resData);
    
  };

  return (
    <>
      <Search onDataChange={getHandleDataChange}/>
      <MapContainer wpaResData={getWpaSearchRes}/>
    </>
  )
}

export default Home