import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, MarkerF as Marker,TrafficLayer } from '@react-google-maps/api';
import { ThemeContext } from '../../../context/ThemeContext';

const MapContainer = ({data}) => {
  const {isTrafficClick, setIsTrafficClick} = useContext(ThemeContext)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA_nkYS3LnLGLrj4Qmky4NntAE97ivSxP8",
  });

  return (<div>
    {!isLoaded ? <h3> Loading....</h3>
    :
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '80vh' }}
        center={data[0]}
        zoom={14}
      >
        {!isTrafficClick  ? data?.map(({lat, lng}, index)=>{
          return <Marker key={index} position={{lat, lng}} />
        })
        : 
        <TrafficLayer />}
        <Marker position={{lat:data.lat, lng:data.lng}} />
      </GoogleMap>}
   
    
      </div>);
};

export default MapContainer;