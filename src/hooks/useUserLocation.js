import { useEffect, useState } from "react";
import axios from "axios";

const useUserLocation = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = async () => {
    try {
      setIsLoading(true);
      const API_KEY = process.env.REACT_APP_BIG_DATA_CLOUD_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is missing.");
      }

      const response = await axios.get(
        `https://api.bigdatacloud.net/data/ip-geolocation?key=${API_KEY}`
      );

      setLat(response.data.location.latitude);
      setLng(response.data.location.longitude);
      const locationData = response.data;
      setLocation(locationData);
      setError(null); // Reset error if location is successfully obtained
    } catch (error) {
      setError("Error getting location data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, lat, lng, isLoading, error };
};

export default useUserLocation;
