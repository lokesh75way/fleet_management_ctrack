import axios from "axios";


const createGroup = async (body) => {
  return axios.post("/business-groups", body);
};

const getGroups = async (page) => {
  let url = "/business-groups";
  if (page !== undefined) {
    url += `?page=${page}&limit=${10}`;
  }
  const { data } = await axios.get(url);
  return { data: data.data.data, totalPage: data.data.totalPage, totalCount: data.data.totalCount };
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
