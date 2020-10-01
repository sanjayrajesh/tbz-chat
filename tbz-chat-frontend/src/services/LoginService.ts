import api from "./api";
import { UserResponse } from "./UserService";

export interface LoginRequest {
    email: string,
    password: string
}

const login = (login: LoginRequest) => api.post<UserResponse>("/login", login);

const LoginService = {
    login
}

export default LoginService;