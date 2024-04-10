import axios from "axios";
import initAxios from "./Axios";
initAxios();

export const getTrips = async (pageNo = 1, status, driverId, startDate, endDate) => {
  console.log("driverIdhi", driverId, startDate, endDate)
  let url = `/trips?page=${pageNo}&limit=10`;
  if (driverId && startDate && endDate) {
    url += `&driverId=${driverId}&start=${startDate}&end=${endDate}`;
  } else {
    url += `&status=${status}`;
  }
  const response = await axios.get(url);
  return { data: response.data.data.data, totalLength: response.data.data.count };
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
