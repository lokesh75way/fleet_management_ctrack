import axios from "axios";

const createGroup = async (body) => {
  const data = await axios.post("/business-groups", body);
  return data.data.data;
};

const getGroups = async (page) => {
  let url = "/business-groups";
  if (page !== undefined) {
    url += `?page=${page}&limit=${10}`;
  }
  const { data } = await axios.get(url);
  return {
    data: data.data.data,
    totalPage: data.data.totalPage,
    totalCount: data.data.totalCount,
  };
};
const deleteGroup = async (body) => {
  return axios.delete(`/business-groups/${body}`);
};
const updateGroup = async (body) => {
  return axios.patch("/business-groups", body);
};

const changePassword = async (body) => {
  const data = axios.post("/business-groups/change-password", body);
  return data;
};

const fileUpload = async (body) => {
  const data = await axios.post("/file-upload", body);
  return data?.data;
};

export {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
  changePassword,
  fileUpload,
};
