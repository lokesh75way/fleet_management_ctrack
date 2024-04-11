import axios from "axios";

const createVehicles = async (body) => {
  return axios.post("/vehicles", body);
};
const getVehicles = async (page) => {
  const {data} = await axios.get(`/vehicles?page=${page}&limit=${10}`);
  console.log(data)
  return {data :data.data.data , totalLength : data.data.totalCount};
};
const deleteVehicles = async (body) => {
  console.log(body);
  return axios.delete(`/vehicles/${body}`);
};
const updateVehicles = async (body,id) => {
  return axios.patch(`/vehicles/${id}`,body);
};

export { createVehicles, getVehicles, deleteVehicles, updateVehicles };
