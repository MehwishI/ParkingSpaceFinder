import React, { useState } from 'react'
import Search from '../Search/Search'
import MapContainer from '../MapContainer/MapContainer'
import AISuggestion from 'components/AISuggestion/AISuggestion';

const Home = () => {
  const [ getCurrentLocAdd, setCurrentLocAdd ] = useState({});
  const [ getWpaSearchRes, setWpaSearchRes ] = useState([]);
  const [ getAiCoordinates, setAiCoordinates ] = useState(null);

  // get current location when page loads
  const getCurrentLocCoords = (resData) => {
    setCurrentLocAdd(resData);
  };

  const getHandleDataChange = (resData) => {
    setWpaSearchRes(resData);
  };

  const getHandleAiSuggestion = (aiResData) => {
    
    setAiCoordinates(aiResData);
    
  };

  return (
    <>
      <Search onDataChange={getHandleDataChange}/>
      <MapContainer wpaResData={getWpaSearchRes} aiSugData={getAiCoordinates} onDataChange={getCurrentLocCoords} />
      <AISuggestion onDataChange={getHandleAiSuggestion} getDestLoc={getWpaSearchRes} getCurrLoc={getCurrentLocAdd}/>
    </>
  )
}

export default Home