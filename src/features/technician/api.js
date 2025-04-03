import { axiosInstance as axios } from "@/services/api";

export const getTechnicianById = async (id) => {
  const { data } = await axios.get(`/technicians/${id}`);
  return data.data;
};

export const getAllTechnicians = async (page = 1, limit = 10) => {
  let url = `/technicians?page=${page}&limit=${limit}`;
  const { data } = await axios.get(url);
  return {
    data: data.data.technicians,
    totalPage: data.data.totalPage,
    totalCount: data.data.count,
  };
};

export const deleteTechnician = async (id) => {
  return await axios.delete(`/technicians/${id}`);
};

export const createTechnician = async (data) => {
  return await axios.post("/technicians", data);
};

export const updateTechnician = async (data, id) => {
  return await axios.patch(`/technicians/${id}`, data);
};

export const getTasks = async (page = 1, limit = 10) => {
  let url = `/technician-tasks?page=${page}&limit=${limit}`;
  const { data } = await axios.get(url);
  return {
    data: data.data.data,
    totalPage: data.data.totalPage,
    totalCount: data.data.totalCount,
  };
};

export const deleteTask = async (id) => {
  return await axios.delete(`/technician-tasks/${id}`);
};

export const createTask = async (data) => {
  return await axios.post("/technician-tasks", data);
};

export const updateTask = async (data, id) => {
  return await axios.patch(`/technician-tasks/${id}`, data);
};
