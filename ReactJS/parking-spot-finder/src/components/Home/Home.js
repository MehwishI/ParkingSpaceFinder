import React, { useState } from 'react'
import Search from '../Search/Search'
import MapContainer from '../MapContainer/MapContainer'
import AISuggestion from 'components/AISuggestion/AISuggestion';

const Home = () => {
  const [ getWpaSearchRes, setWpaSearchRes ] = useState([]);
  const [ getAiCoordinates, setAiCoordinates ] = useState(null);

  const getHandleDataChange = (resData) => {
    setWpaSearchRes(resData);
  };

  const getHandleAiSuggestion = (aiResData) => {
    console.log("hihihi");
    
    setAiCoordinates(aiResData);
    
  };

  return (
    <>
      <Search onDataChange={getHandleDataChange}/>
      <MapContainer wpaResData={getWpaSearchRes} aiSugData={getAiCoordinates}/>
      <AISuggestion onDataChange={getHandleAiSuggestion}/>
    </>
  )
}

export default Home