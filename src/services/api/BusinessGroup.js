import axios from "axios";


const createGroup = async (body) => {
  return axios.post("/business-groups", body);
};
const getGroups = async () => {
  const { data } = await axios.get("/business-groups");
  return { data: data.data.data, totalLength: data.data.totalLength };
};
const deleteGroup = async (body) => {
  return axios.delete(`/business-group/${body}`);
};
const updateGroup = async (body) => {
  console.log(body)
  return axios.patch("/business-groups",body);
};

const changePassword = async (body) => {
  const data= axios.post("/business-groups/change-password",body);
  return data
}

export { createGroup, getGroups, deleteGroup, updateGroup , changePassword};
