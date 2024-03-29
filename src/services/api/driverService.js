import axios from "axios";
import initAxios from "./Axios";
initAxios();

export const createDriver = async (body) => {
  return axios.post("/driver", body);
};

export const updateDriver = async (body) => {
  return axios.patch("/driver", body);
};

export const getDrivers = async (pageNo, limit) => {
  const { data } = await axios.get(`/driver/?page=${pageNo}&limit=${limit}`);
  return { data: data.data.data, totalLength: data.data.totalLength };
};

export const getDriverById = async (driverId) => {
  const { data } = await axios.get(`/driver/${driverId}`);
  return data.data;
};

export const deleteDrivers = async (body) => {
  return axios.delete(`/driver`, {
    data: body,
  });
};
