import { get } from "react-scroll/modules/mixins/scroller";
import requests from "./Axios";
import axios from "axios";
import initAxios from "./Axios";
initAxios()


const TemplateServices = {
  getTemplates: async (body) => {
    try {
      const response = await axios.get("/feature-template", body);
      return response.data; // Directly return the data array
    } catch (error) {
      console.error("Error fetching modules:", error);
      throw error; // Re-throwing the error for the caller to handle
    }
  },
  getTemplates: async () => {
    return axios.get("/feature-template");
  },
  
//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },


  createTemplate: async (body) => {

    try {
      console.log(body)
      const response = await axios.post("/feature-template", body);
      return response.data; // Directly return the data array
    } catch (error) {
      console.error("Error fetching modules:", error);
      throw error; // Re-throwing the error for the caller to handle
    }
  },
  listModule: async (body) => {
    try {
      const response = await axios.get("/modules", body);
      return response.data; // Directly return the data array
    } catch (error) {
      console.error("Error fetching modules:", error);
      throw error; // Re-throwing the error for the caller to handle
    }
  },
};

export default TemplateServices;
