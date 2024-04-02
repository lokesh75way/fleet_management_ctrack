import axios from 'axios';
import initAxios from './Axios';

initAxios();

export const getAllBranch = async (companyId) => {
    let url = '/branches';
    if (companyId) {
        url += `?companyId=${companyId}`;

    }
    const data = await axios.get(url);
    return data.data;
}
export const createNewBranch = async (body) => {
    const data = await axios.post('/branches', body);
    return data.data;
}
export const deleteBranch = async (body) => {
    const data = await axios.delete(`/branches/${body}`);
    return data.data;
}
export const editBranch = async (body) => {
    const data = await axios.patch(`/branches`, body);
    return data.data;
}
