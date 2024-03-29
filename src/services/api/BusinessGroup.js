import axios from "axios";
const createGroup = async (body) => {
  console.log(body);
  return axios.post("/business-group", body);
};
const getGroups = async (body) => {
  const { data } = await axios.get("/business-group", body);
  console.log(data);
  return { data: data.data.data, totalLength: data.data.totalLength };
};
const deleteGroup = async (body) => {
  return axios.delete(`/business-group/${body}`);
};
const updateGroup = async (body) => {
  return axios.patch("/business-group");
};
export { createGroup, getGroups, deleteGroup, updateGroup };
