import { axiosInstance as axios } from "@/services/api";

export const createVehicles = async (body) => {
  return axios.post("/vehicles", body);
};

export const getAllVehicles = async (page, limit, filter) => {
  const params = {
    page: page || 1,
    limit: limit || 10,
    ...filter,
  };

  const { data } = await axios.get(`/vehicles`, { params });
  return { data: data.data.data, totalCount: data.data.totalCount };
};

export const getUnassignedVehicles = async (page) => {
  const { data } = await axios.get(
    `/vehicles/unassigned?page=${page}&limit=${10}`
  );
  return { data: data.data.data, totalCount: data.data.totalCount };
};

export const deleteVehicle = async (body) => {
  return axios.delete(`/vehicles/${body}`);
};

export const updateVehicles = async (body, id) => {
  return axios.patch(`/vehicles/${id}`, body);
};

export const getVehiclesByCompany = async (search = "") => {
  const { data } = await axios.get(`/vehicles/list?search=${search}`);
  return { data: data.data };
};

export const getVehiclesTraking = async (id, status) => {
  const { data } = await axios.get(`/vehicles/tracking?${id}&status=${status}`);
  return {
    data: data.data.data,
    count: data.data.count,
    centerCoordinate: data.data.centerCoordinate,
  };
};

export const getVehicleById = async (id) => {
  const { data } = await axios.get(`/vehicles/${id}`);
  return data?.data?.data;
};
