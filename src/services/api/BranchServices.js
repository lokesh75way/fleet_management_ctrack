import axios from 'axios';
import initAxios from './Axios';

initAxios();

export const getAllBranch =  async () => {
    const data = await axios.get('/branches');
    return data.data;
}
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