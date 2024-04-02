import axios from 'axios';
import initAxios from './Axios';

initAxios();

// export const getAllBranch =  async () => {
//     const data = await axios.get('/branches');
//     return data.data;
// }
export const getAllBranch = async (page) => {
    let url = "/branches";
    if (page !== undefined) {
      url += `?page=${page}&limit=${10}`;
    }
    const data= await axios.get(url);
    return data.data
  };
export const createNewBranch =  async (body) => {
    const data = await axios.post('/branches',body);
    return data.data;
}
export const deleteBranch =  async (body) => {
    const data = await axios.delete(`/branches/${body}`);
    return data.data;
}
export const editBranch =  async (body) => {
    const data = await axios.patch(`/branches`, body);
    return data.data;
}
