import { axiosInstance as axios } from "@/services/api";

const createGroup = async (body) => {
  const data = await axios.post("/business-groups", body);
  return data.data.data;
};

const getAllGroups = async (page) => {
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

const getGroupById = async (id) => {
  const { data } = await axios.get(`/business-groups/${id}`);
  return data?.data;
};

const deleteGroup = async (body) => {
  return axios.delete(`/business-groups/${body}`);
};

const updateGroup = async (id, body) => {
  return axios.put(`/business-groups/${id}`, body);
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
  getAllGroups,
  deleteGroup,
  updateGroup,
  changePassword,
  fileUpload,
  getGroupById,
};
