import axios from "axios";
import initAxios from "../api";
initAxios();

export const getTechnicianById = async (id) => {
  const { data } = await axios.get(`/technicians/${id}`);
  return data.data;
};

export const getTechnicians = async (page = 1, limit = 10) => {
  let url = `/technicians?page=${page}&limit=${limit}`;
  const response = await axios.get(url);
  return response?.data?.data;
};

export const deleteTechnician = async (id) => {
  const response = await axios.delete(`/technicians/${id}`);
  return response?.data?.data;
};

export const createTechnician = async (data) => {
  const response = await axios.post("/technicians", data);
  return response?.data?.data;
};

export const updateTechnician = async (data, id) => {
  const response = await axios.patch(`/technicians/${id}`, data);
  return response?.data?.data;
};

export const getTasks = async (page = 1, limit = 10) => {
  let url = `/technician-tasks?page=${page}&limit=${limit}`;
  const response = await axios.get(url);
  return response?.data?.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`/technician-tasks/${id}`);
  return response?.data?.data;
};

export const createTask = async (data) => {
  const response = await axios.post("/technician-tasks", data);
  return response?.data?.data;
};

export const updateTask = async (data, id) => {
  const response = await axios.patch(`/technician-tasks/${id}`, data);
  return response?.data?.data;
};
