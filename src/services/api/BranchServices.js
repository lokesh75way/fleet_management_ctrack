import axios from 'axios';
import initAxios from './Axios';

initAxios();

export const getAllBranch =  async () => {
    const data = await axios.get('/branch');
    return data.data;
}
export const createNewBranch =  async (body) => {
    const data = await axios.post('/branch',body);
    return data.data;
}