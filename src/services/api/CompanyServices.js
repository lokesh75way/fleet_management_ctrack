import axios from "axios";

// export const getCompany = async () => {
//   return axios.get("/companies");
// };

export const getCompany = async (page, groupId, limit = 10) => {
  let url = "/companies";
  let params = [];
  if (page) {
    params.push(`page=${page}`);
    params.push(`limit=${limit}`);
  }
  if (groupId !== undefined) {
    params.push(`businessGroupId=${groupId}`);
  }
  if (params.length > 0) {
    url += "?" + params.join("&");
  }
  return await axios.get(url);
};
export const addCompany = async (body) => {
  const data = await axios.post("/companies", body);
  return data.data.data;
};
export const deleteCompany = async (_id) => {
  console.log(_id);
  return axios.delete(`/companies/${_id}`);
};
export const editCompany = async (body) => {
  return axios.patch("/companies", body);
};

export const changePassword = async (body) => {
  const data = axios.post("/companies/change-password", body);
  return data;
};

//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },
