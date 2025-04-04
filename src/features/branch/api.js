import { axiosInstance as axios } from "@/services/api";

export const getAllBranch = async (page, limit, filter) => {
  const params = {
    page: page || 1,
    limit: limit || 10,
    ...filter,
  };
  const { data } = await axios.get("/branches", { params });
  return {
    data: data.data.data,
    totalPage: data.data.totalPage,
    totalCount: data.data.totalCount,
  };
};

export const getBranchById = async (id) => {
  const { data } = await axios.get(`/branches/${id}`);
  return data?.data;
};

export const createNewBranch = async (body) => {
  const data = await axios.post("/branches", body);
  return data.data;
};

export const deleteBranch = async (body) => {
  const data = await axios.delete(`/branches/${body}`);
  return data.data;
};

export const editBranch = async (id, body) => {
  const data = await axios.put(`/branches/${id}`, body);
  return data.data;
};
