import { axiosInstance as axios } from "@/services/api";

export const getAllCompanies = async (page, limit, filter) => {
  const params = {
    page: page || 1,
    limit: limit || 10,
  };

  if (filter?.groupId) {
    params.groupId = filter?.groupId;
  }

  const { data } = await axios.get("/companies", { params });
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
  return axios.delete(`/companies/${_id}`);
};

export const editCompany = async (id, body) => {
  return axios.put(`/companies/${id}`, body);
};

export const changePassword = async (body) => {
  const data = axios.post("/companies/change-password", body);
  return data;
};
