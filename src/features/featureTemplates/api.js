import { axiosInstance as axios } from "@/services/api";

export const getAllModules = async () => {
  const { data } = await axios.get("/modules");
  return data?.data;
};
