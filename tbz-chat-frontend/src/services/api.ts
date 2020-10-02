import axios from 'axios';
import { getAuthToken } from '../redux/auth/authReducer';

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

api.interceptors.request.use(
    request => {
        const token = getAuthToken();

        if(token) {
            request.headers['Authorization'] = token;
        }

        return request;
    }
);

export default api;