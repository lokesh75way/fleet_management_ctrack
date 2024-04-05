import axios from "axios";
import initAxios from "./Axios";
initAxios();
export const getTrips = async () => {
    const { data } = await axios.get(`/trips`);
    return { data: data.data };
  };
  
export const createTrip = async (body) => {
  return axios.post("/trips", body);
};

export const updateTrip = async (body) => {
  return axios.patch("/trips", body);
};


