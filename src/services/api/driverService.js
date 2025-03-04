import axios from "axios";
import initAxios from "../api";
initAxios();

export const createDriver = async (body) => {
  return await axios.post("/drivers", body);
};

export const updateDriver = async (id, body) => {
  return axios.put(`/drivers/${id}`, body);
};

export const getDrivers = async (pageNo = 1, limit) => {
  const { data } = await axios.get(`/drivers/?page=${pageNo}&limit=${10}`);
  return { data: data.data.data, totalLength: data.data.totalCount };
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
