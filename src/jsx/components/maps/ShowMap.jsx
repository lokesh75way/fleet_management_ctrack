import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, MarkerF as Marker,TrafficLayer } from '@react-google-maps/api';
import { ThemeContext } from '../../../context/ThemeContext';
import MapModes from './MapModes'

const MapContainer = ({data}) => {
  const {isTrafficClick, setIsTrafficClick} = useContext(ThemeContext)
  
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${apiKey}`,
  });

  return (<div>
    {!isLoaded ? <h3> Loading....</h3>
    :
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '80vh' }}
        center={data[0]}
        zoom={13}
      >
        {!isTrafficClick  ? data?.map(({lat, lng}, index)=>{
          return <Marker key={index} position={{lat, lng}} />
        })
        : 
        <TrafficLayer />}
       
      </GoogleMap>}
   
      <MapModes/> 
      </div>);
};

export default MapContainer;