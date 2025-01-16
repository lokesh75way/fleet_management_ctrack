import { axiosInstance as axios } from "@/services/api";

export const createVehicles = async (body) => {
  return axios.post("/vehicles", body);
};

export const getAllVehicles = async (page, branchIds) => {
  let url = `/vehicles?page=${page}&limit=10`;

  if (branchIds) {
    if (Array.isArray(branchIds)) {
      // If branchIds is an array, append each branchId to the URL
      branchIds.forEach((id) => {
        url += `&branchIds=${id}`;
      });
    } else {
      // If branchIds is a single value, append it directly to the URL
      url += `&branchIds=${branchIds}`;
    }
  }

  const { data } = await axios.get(url);
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
