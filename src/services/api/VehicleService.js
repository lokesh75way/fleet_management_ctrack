import axios from "axios";

const createVehicles = async (body) => {
  return axios.post("/vehicles", body);
};
const getVehicles = async (body) => {
  const {data} = await axios.get("/vehicles", body);
  console.log(data)
  return {data :data.data.data , totalLength : data.data.totalLength};
};
const deleteVehicles = async (body) => {
  console.log(body);
  return axios.delete(`/vehicles/${body}`);
};
const updateVehicles = async (body) => {
  return axios.patch("/vehicles");
};

export { createVehicles, getVehicles, deleteVehicles, updateVehicles };
