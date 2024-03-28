import axios from "axios";

const VehicleServices = {
  createVehicles: async (body) => {
    return axios.patch("/vehicle", body);
  },
  getVehicles: async (body) => {
    return axios.get("/vehicle", body);
  },
  deleteVehicles: async (body) => {
    console.log(body)
    return axios.delete(`/vehicle/${body}`);
  },
  updateVehicles: async (body) => {
    return axios.patch('/vehicle')
  }

};

export default VehicleServices;
