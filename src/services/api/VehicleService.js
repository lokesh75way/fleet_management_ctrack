import axios from "axios";

const createVehicles = async (body) => {
  return axios.patch("/vehicle", body);
};
const getVehicles = async (body) => {
  const {data} = await axios.get("/vehicle", body);
  console.log(data)
  return {data :data.data.data , totalLength : data.data.totalLength};
};
const deleteVehicles = async (body) => {
  console.log(body);
  return axios.delete(`/vehicle/${body}`);
};
const updateVehicles = async (body) => {
  return axios.patch("/vehicle");
};

export { createVehicles, getVehicles, deleteVehicles, updateVehicles };
