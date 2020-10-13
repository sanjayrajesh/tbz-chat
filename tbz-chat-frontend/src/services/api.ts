import axios from 'axios';
import { getAuthToken } from '../redux/auth/authReducer';

declare global {
    interface Window {
        _env_: {
            REACT_APP_BASE_URL?: string
        }
    }
}

const api = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? window._env_.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL
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