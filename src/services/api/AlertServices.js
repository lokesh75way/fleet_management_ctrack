import axios from "axios";


const createAlert = async (body) => {
  const data = await axios.post("/alerts", body);

  console.log('this is data',data);
  return data.data.data
};

const getAllAlert = async (page) => {
  let url = "/alerts";
  if (page !== undefined) {
    url += `?page=${page}&limit=${10}`;
  }
  const { data } = await axios.get(url);

  console.log(' this is alert get data', data);
  return { data: data.data.data, totalPage: data.data.totalPage, totalCount: data.data.totalCount };
};

const deleteAlert = async (body) => {
  return axios.delete(`/alerts/${body}`);
};

const getAlertById = async (body) => {
  return axios.get(`/alerts/${body}`);
};

const updateAlert = async (body) => {
  return axios.put(`/alerts/${body}`);
};


export { createAlert, getAllAlert, deleteAlert, updateAlert,getAlertById};
