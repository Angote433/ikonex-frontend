import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ikonexstudentsystem-production.up.railway.app'
});

export default api