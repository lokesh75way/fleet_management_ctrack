import React, { useState, useEffect, useContext } from "react";
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, GeoJSON,Marker,Popup ,Tooltip} from 'react-leaflet';
import EditControlFC from '../components/maps/EditControl';

const Map = () => {
  const [geojson, setGeojson] = React.useState({
    type: 'FeatureCollection',
    features: [],
  });

  return (
    <div style={{ display: 'flex', height: '85vh' }}>
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
        <EditControlFC geojson={geojson} setGeojson={setGeojson} />
      </MapContainer>
    </div>
  </div>
  );
}

export default Map