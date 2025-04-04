import { axiosInstance as axios } from "@/services/api";

export const getAllModules = async () => {
  const { data } = await axios.get("/modules");
  return data?.data;
};

export const getAllTemplates = async (page) => {
  let url = "/feature-template";
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

export const deleteTemplate = async (id) => {
  return await axios.delete(`/feature-template/${id}`);
};

export const createTemplate = async (body) => {
  return await axios.post("/feature-template", body);
};

export const updateTemplate = async (body) => {
  return await axios.patch("/feature-template", body);
};

export const getTemplateById = async (id) => {
  const { data } = await axios.get(`/feature-template/${id}`);
  return data?.data?.data;
};