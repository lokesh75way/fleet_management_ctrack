import axios from "axios";
import initAxios from "./Axios";
initAxios();

export const getAlertById = async (id) => {
  const { data } = await axios.get(`/alerts/${id}`);
  return data.data;
};

export const getAlerts = async (page = 1, limit = 10) => {
  let url = `/alerts?page=${page}&limit=${limit}`;
  const response = await axios.get(url);
  return response?.data?.data;
};

export const deleteAlert = async (id) => {
  const response = await axios.delete(`/alerts/${id}`);
  return response?.data?.data;
};

export const createAlert = async (data) => {
  const response = await axios.post("/alerts", data);
  return response?.data?.data;
};

export const updateAlert = async (data, id) => {
  const response = await axios.put(`/alerts/${id}`, data);
  return response?.data?.data;
};
