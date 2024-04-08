import axios from "axios";
import initAxios from "./Axios";
initAxios();

export const getTrips = async (pageNo=1, limit=10 ,status) => {
  const { data } = await axios.get(`/trips?page=${pageNo}&limit=${limit}&status=${status}`);
//   console.log(data.data.length, "ko:-")
  return { data: data.data.data, totalLength: data.data.length };
};

export const createTrip = async (body) => {
  return axios.post("/trips", body);
};

export const updateTrip = async (id,body) => {
  return axios.patch(`/trips/${id}`, body);
};

export const deleteTrip = async (id) => {
  return axios.delete(`/trips/${id}`);
};
