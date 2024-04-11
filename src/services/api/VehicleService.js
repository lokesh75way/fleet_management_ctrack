import axios from "axios";

const createVehicles = async (body) => {
  return axios.post("/vehicles", body);
};
const getVehicles = async (body) => {
  const {data} = await axios.get("/vehicles", body);
  return {data :data.data.data , totalLength : data.data.totalLength};
};
const deleteVehicles = async (body) => {
  console.log(body);
  return axios.delete(`/vehicles/${body}`);
};
const updateVehicles = async (body,id) => {
  return axios.patch(`/vehicles/${id}`,body);
};

const getVehiclesByCompany = async () => {
  const {data} = await axios.get("/vehicles/list", );
  console.log(data)
  return { data :data.data };
};

const getVehiclesTraking = async (id, status) => {
  const {data} = await axios.get(`/vehicles/tracking?${id}&status=${status}`, );
  console.log(data)
  return { data :data.data };
};

export { createVehicles, getVehicles, deleteVehicles, updateVehicles, getVehiclesByCompany, getVehiclesTraking };
