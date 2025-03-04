import axios from "axios";
import initAxios from "../api";

initAxios();

export const getAllBranch = async (page, companyId, branchId) => {
  let url = "/branches";
  let params = [];
  if (page) {
    params.push(`page=${page}`);
    params.push(`limit=${10}`);
  }
  if (companyId) {
    params.push(`companyId=${companyId}`);
  }
  if (branchId) {
    params.push(`branchId=${branchId}`);
  }
  if (params.length > 0) {
    url += "?" + params.join("&");
  }
  const data = await axios.get(url);
  return data.data;
};
export const createNewBranch = async (body) => {
  const data = await axios.post("/branches", body);
  return data.data;
};
export const deleteBranch = async (body) => {
  const data = await axios.delete(`/branches/${body}`);
  return data.data;
};
export const editBranch = async (body) => {
  const data = await axios.put(`/branches/${body?.branchId}`, body);
  return data.data;
};
