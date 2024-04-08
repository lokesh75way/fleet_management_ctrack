import axios from "axios";
import initAxios from "./Axios";
initAxios();

export const getExpenses = async (pageNo=1, limit=10) => {
  const { data } = await axios.get(`/expenses?page=${pageNo}&limit=${limit}`);
  console.log(data.data.data, "ko:-")
  return { data: data.data.data, totalLength: data.data.length };
};

export const createExpense = async (body) => {
  return axios.post("/expense", body);
};

export const updateExpense = async (id,body) => {
  return axios.patch(`/expense/${id}`, body);
};

export const deleteExpense = async (id) => {
  return axios.delete(`/expense/${id}`);
};
