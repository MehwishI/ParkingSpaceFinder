import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import MapContainer from "../MapContainer/MapContainer";
import TopNavigationBar from "components/TopNavigationBar/TopNavigationBar";
import AISuggestion from "components/AISuggestion/AISuggestion";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import HomeParkingList from "components/HomeParkingList/HomeParkingList";
import HomeParkingHistory from "components/HomeParkingList/HomeParkingHistory";
import { useAuth0 } from "@auth0/auth0-react";
import { getRealAddress } from "../../services/getCoordinatesService";

const isProd = process.env.REACT_APP_ISPROD;

const Home = () => {
  const [getCurrentLocAdd, setCurrentLocAdd] = useState({});
  const [getWpaSearchRes, setWpaSearchRes] = useState([]);
  const [getAiCoordinates, setAiCoordinates] = useState(null);
  const [getAllParkingLocs, setAllParkingLocs] = useState([]);
  const [mapHeight, setMapHeight] = useState("120px");
  const [labelPark, setLabelPark] = useState(true);
  const [realAddress, setRealAddress] = useState(null);

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

  const getCurrentAddress = () => { };

  const getAllLocsCoord = (getAllLocs) => {
    setAllParkingLocs(getAllLocs);
  };

  useEffect(() => {
    console.log("lenghty", getAllParkingLocs.length);
    if (getAllParkingLocs.length > 0) {
      console.log("lenghty one");

      setMapHeight("120px");
      setLabelPark(false);
    } else {
      // setMapHeight("470px");
      console.log("lenghty two");
      const updateHeightOnScreenChange = () => {
        console.log("lenghty three");
        // setMapHeight(

        //   //   window.matchMedia("(max-width: 369px)").matches 
        //   // ? "400px" : window.matchMedia("(max-width: 414px)").matches ? "120"
        //   // : "470px");

        //   window.matchMedia("(max-width: 360px)").matches
        //     ? "400px"
        //     : window.matchMedia("(max-width: 414px) and (min-width: 375px)").matches
        //       ? "470px"
        //       : window.matchMedia("(max-width: 736px) and (min-width: 667px)").matches
        //         ? "400px"
        //         : window.matchMedia("(max-width: 360px) and (min-width: 360px)").matches
        //           ? "400px"
        //           : "470px");

        setMapHeight(
          
          window.matchMedia("(max-width: 360px)").matches
            ? (console.log("Galaxy A50 or similar: Width <= 360px"), "400px")
            : window.matchMedia("(max-width: 414px) and (min-width: 375px)").matches
            ? (console.log("Width between 375px and 414px"), "470px")
            : window.matchMedia("(max-width: 736px) and (min-width: 667px)").matches
            ? (console.log("Width between 667px and 736px"), "400px")
            : window.matchMedia("(max-width: 360px) and (min-width: 360px)").matches
            ? (console.log("Galaxy A50: Exact Width = 360px"), "400px")
            : (console.log("Default size: > 736px or no media query matched"), "470px")
        );

        setLabelPark(true);
      }

      updateHeightOnScreenChange();

      window.addEventListener("resize", updateHeightOnScreenChange);

      return () => window.removeEventListener("resize", updateHeightOnScreenChange);
    }
  }, [getAllParkingLocs]);

  const getRealAddressFunc = async () => {
    if (Object.keys(getCurrentLocAdd).length > 0) {
      const getAddressService = await getRealAddress(getCurrentLocAdd);

      setRealAddress(getAddressService);
    }
  };

  useEffect(() => {
    try {
      getRealAddressFunc();
    } catch (error) {
      console.error(error);
    }
  }, [getCurrentLocAdd]);

  return (
    <>
      <div className="container">
        <div className="serach-style">
          <Search
            onDataChange={getHandleDataChange}
            backgroundColor={"#129F4E"}
            marginLeft={"2px"}
            isHomeScreen={true}
          />
        </div>

        <HomeParkingHistory />

        {getAllParkingLocs.length > 0 && (
          <label className="park-label-style">
            <b>Parkings near you</b>
          </label>
        )}

        <div className="map-outer-container">
          <div className="map-second-layer">
            <div className="mapcontainer-home" style={{ height: mapHeight }}>
              <MapContainer
                wpaResData={getWpaSearchRes}
                aiSugData={getAiCoordinates}
                onDataChange={getCurrentLocCoords}
                getAllLocsData={getAllParkingLocs}
              />
            </div>

            {realAddress && (
              <div className="col-sm-6 align-items-center overlay-box">
                <span className="overlay-text-up">
                  {realAddress.longAddress}
                </span>
                <br></br>
                <span className="overlay-text-down">
                  {realAddress.formattedAddress}
                </span>
              </div>
            )}
          </div>

          <HomeParkingList
            getAllParkList={getAllLocsCoord}
            getCurrLocAdd={getCurrentLocAdd}
            getCurrRealAddress={realAddress}
          />
        </div>

        {/* <AISuggestion
          onDataChange={getHandleAiSuggestion}
          getDestLoc={getWpaSearchRes}
          getCurrLoc={getCurrentLocAdd}
        /> */}
      </div>
    </>
  );
};

export default Home;
