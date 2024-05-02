import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserLocation({ onLocationData }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    try {
      const API_KEY = process.env.REACT_APP_BIG_DATA_CLOUD_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is missing.");
      }

      const response = await axios.get(`https://api.bigdatacloud.net/data/ip-geolocation?key=${API_KEY}`);

      setLatitude(response.data.location.latitude);
      setLongitude(response.data.location.longitude);
        const locationData = response.data;
      onLocationData(locationData);
      setError(null); // Reset error if location is successfully obtained
    } catch (error) {
      setError("Error getting location data: " + error.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default UserLocation;
