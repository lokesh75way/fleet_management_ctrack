import axios from "axios";

const createVehicles = async (body) => {
  return axios.post("/vehicles", body);
};
const getVehicles = async (page, branchIds) => {
  let url = `/vehicles?page=${page}&limit=10`;

  if (branchIds) {
    if (Array.isArray(branchIds)) {
      // If branchIds is an array, append each branchId to the URL
      branchIds.forEach(id => {
        url += `&branchIds=${id}`;
      });
    } else {
      // If branchIds is a single value, append it directly to the URL
      url += `&branchIds=${branchIds}`;
    }
  }

  const { data } = await axios.get(url);
  return { data: data.data.data, totalLength: data.data.totalCount };
};


const getUnassignedVehicles = async (page) => {
  const {data} = await axios.get(`/vehicles/unassigned?page=${page}&limit=${10}`);
  return {data :data.data.data , totalLength : data.data.totalCount};
};

const deleteVehicles = async (body) => {
  console.log(body);
  return axios.delete(`/vehicles/${body}`);
};
const updateVehicles = async (body,id) => {
  return axios.patch(`/vehicles/${id}`,body);
};

const getVehiclesByCompany = async (search = "") => {
  const {data} = await axios.get(`/vehicles/list?search=${search}`, );
  return { data :data.data };
};

const getVehiclesTraking = async (id, status) => {
  const {data} = await axios.get(`/vehicles/tracking?${id}&status=${status}`, );
  return { data :data.data };
};

export { createVehicles, getVehicles, deleteVehicles, updateVehicles, getVehiclesByCompany, getVehiclesTraking, getUnassignedVehicles };
