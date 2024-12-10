import axios from "axios";
import initAxios from "../../services/api";
initAxios();

export const getAllUser = async (page) => {
  let url = "/users";
  if (page !== undefined) {
    url += `?page=${page}&limit=${10}`;
  }
  const { data } = await axios.get(url);
  return {
    data: data.data.data,
    totalPage: data.data.totalPage,
    totalCount: data.data.count,
  };
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/users/${id}`);
  return response?.data?.data;
};

export const createUser = async (data) => {
  const response = await axios.post("/users", data);
  return response?.data?.data;
};

export const updateUser = async (id, data) => {
  const response = await axios.put(`/users/${id}`, data);
  return response?.data?.data;
};

export const getUserById = async (id) => {
  const { data } = await axios.get(`/users/${id}`);
  return data?.data;
};
