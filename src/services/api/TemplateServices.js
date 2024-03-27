import requests from "./Axios";

const TemplateServices = {
  getModules: async (body) => {
    return requests.get("/modules", body);
  },

  
//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },

 
};

export default TemplateServices;
