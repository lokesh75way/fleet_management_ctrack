import {axiosInstance as axios} from "@/services/api";

export const getAllUser = async (page, limit, filter) => {
  const params = {
    page: page || 1,
    limit: limit || 10,
    ...filter,
  };
  const { data } = await axios.get(`/users`, { params });
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
