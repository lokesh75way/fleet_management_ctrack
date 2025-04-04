import {axiosInstance as axios} from "@/services/api";

export const createDriver = async (body) => {
  return axios.post("/drivers", body);
};

export const updateDriver = async (id, body) => {
  return axios.put(`/drivers/${id}`, body);
};

export const getAllDrivers = async (pageNo = 1, limit = 10, filter) => {
  const params = {
    page: pageNo,
    limit,
    ...filter,
  };
  console.log({ filter });

  const { data } = await axios.get(`/drivers`, { params });
  return { data: data.data.data, totalCount: data.data.totalCount };
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
