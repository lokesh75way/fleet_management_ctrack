import { axiosInstance as axios } from "@/services/api";

export const getAllCompanies = async (page, groupId, limit = 10) => {
  let url = "/companies";
  let params = [];
  if (page) {
    params.push(`page=${page}`);
    params.push(`limit=${limit}`);
  }
  if (groupId !== undefined) {
    params.push(`businessGroupId=${groupId}`);
  }
  if (params.length > 0) {
    url += "?" + params.join("&");
  }
  const { data } = await axios.get(url);
  return {
    data: data.data.data,
    totalPage: data.data.totalPage,
    totalCount: data.data.totalCount,
  };
};

export const getCompanyById = async (id) => {
  const { data } = await axios.get(`/companies/${id}`);
  return data.data;
};

export const addCompany = async (body) => {
  const data = await axios.post("/companies", body);
  return data.data.data;
};

export const deleteCompany = async (_id) => {
  console.log(_id);
  return axios.delete(`/companies/${_id}`);
};

export const editCompany = async (id, body) => {
  return axios.put(`/companies/${id}`, body);
};

export const changePassword = async (body) => {
  const data = axios.post("/companies/change-password", body);
  return data;
};
