import { get } from "react-scroll/modules/mixins/scroller";
import requests from "./Axios";
import axios from "axios";
import initAxios from "./Axios";
initAxios()


const TemplateServices = {
  getModules: async (body) => {
    return requests.get("/modules", body);
  },
  getTemplates: async () => {
    return axios.get("/feature-template");
  }
  
//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },


};

export default TemplateServices;
