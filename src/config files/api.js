import axios from 'axios';

const fetchAPI = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});
export default fetchAPI;