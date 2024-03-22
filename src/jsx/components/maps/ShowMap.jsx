import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import MapModes from "./MapModes";
import "../../../scss/pages/_driver-tracking.scss"
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, GeoJSON,Marker,Popup ,Tooltip} from 'react-leaflet';
import EditControlFC from './EditControl';

const ShowMapContainer = ({ data }) => {

  return (
    <div style={{ display: 'flex', height: '85vh' , position : "relative" , zIndex : 1}}>
    <div style={{ width: '100%' }}>
      <MapContainer
        center={[ 25.2233, 55.2869]}
        zoom={14}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />       
        <Marker styles={{background:'red'}} position={[ 25.2233, 55.2869]} ><Popup>Dubai Trade Center</Popup><Tooltip>Dubai Trade Center</Tooltip></Marker>
      </MapContainer>
    </div>
  </div>
  );
};

export default ShowMapContainer;
// const { isTrafficClick, setIsTrafficClick } = useContext(ThemeContext);

// const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: `${apiKey}`,
// });
{/* <div className="vehicle_tracking">
      <MapModes />
      {!isLoaded ? (
        <h3> Loading....</h3>
      ) : (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "80vh" }}
          center={data[0]}
          zoom={13}
        >
          {!isTrafficClick ? (
            data?.map(({ lat, lng }, index) => {
              return <Marker key={index} position={{ lat, lng }} />;
            })
          ) : (
            <TrafficLayer />
          )}
        </GoogleMap>
      )}

      
    </div> */}
