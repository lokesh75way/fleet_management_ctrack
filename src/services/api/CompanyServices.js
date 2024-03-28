import axios from "axios";
import initAxios from "./Axios";
initAxios()
  export const getCompany =  async () => {
    return axios.get("/company");
  }
  export const addCompany =  async (body) => {
    return axios.post("/company", body);
  }
  export const deleteCompany = async (body) => {
    return axios.delete("/company", body);
  }
  export const editCompany = async (body) => {
    return axios.patch("/company", body);
  }
//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },









