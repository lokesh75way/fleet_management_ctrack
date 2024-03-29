import axios from "axios";


  export const getCompany =  async () => {
    return axios.get("/companies");
  }
  export const addCompany =  async (body) => {
    return axios.post("/companies", body);
  }
  export const deleteCompany = async (_id) => {
    console.log(_id)
    return axios.delete(`/companies/${_id}`);
  }
  export const editCompany = async (body) => {
    return axios.patch("/companies", body);
  }

 export  const changePassword = async (body) => {
    const data= axios.post("/companies/change-password",body);
    return data
  }
  
//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },


