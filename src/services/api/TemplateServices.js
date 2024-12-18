import requests from "../api";
import axios from "axios";
import initAxios from "../api";
initAxios();

export const getTemplates = async (page) => {
  try {
    let url = "/feature-template";
    if (page !== undefined) {
      url += `?page=${page}&limit=${10}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    return { error: "Couldn't fetch User" };
  }
};

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

  //   getStaffById: async (id, body) => {
  //     return requests.post(`/admin/${id}`, body);
  //   },

  createTemplate: async (body) => {
    try {
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

  udpateTemplate: async (body) => {
    try {
      const response = await axios.patch("/feature-template", body);
      return response.data; // Directly return the data array
    } catch (error) {
      console.error("Error fetching modules:", error);
      throw error; // Re-throwing the error for the caller to handle
    }
  },

  deleteTemplate: async (id) => {
    try {
      const response = await axios.delete(`/feature-template/${id}`);
      return response.data; // Directly return the data array
    } catch (error) {
      console.error("Error fetching modules:", error);
      throw error; // Re-throwing the error for the caller to handle
    }
  },
};

export default TemplateServices;
