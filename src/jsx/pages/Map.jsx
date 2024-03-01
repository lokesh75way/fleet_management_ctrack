import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA_nkYS3LnLGLrj4Qmky4NntAE97ivSxP8"
  });

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: 30.7099127700684,
    lng: 76.69003904617821,
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    <Marker position={center}/>
      <></>
    </GoogleMap>
  ) : <></>;
};

export default Map;
