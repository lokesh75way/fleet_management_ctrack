import axios from "axios";
import initAxios from "./Axios";
initAxios();

export const createDriver = async (body) => {
  return axios.post("/drivers", body);
};

export const updateDriver = async (id, body) => {
  console.log("this is the id", body)
  return axios.put(`/drivers/${id}`, body);
};

export const getDrivers = async (pageNo, limit) => {
  const { data } = await axios.get(`/drivers/?page=${pageNo}&limit=${limit}`);
  return { data: data.data.data, totalLength: data.data.totalLength };
};

export const getDriverById = async (driverId) => {
  const { data } = await axios.get(`/drivers/${driverId}`);
  return data.data;
};

export const deleteDrivers = async (body) => {
  return axios.delete(`/drivers`, {
    data: body,
  });
};
