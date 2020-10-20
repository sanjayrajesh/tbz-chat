import User from "../models/User";
import api from "./api";
import { ChatResponse } from "./ChatService";

export interface CreateUserRequest {
    email: string;
}

export interface CreateUserResponse {
    id: string;
    email: string;
    username: null;
}

export interface UserResponse {
    id: string;
    email: string;
    username: string | null;
    chats: ChatResponse[];
}

export interface UpdatePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

const create = (user: CreateUserRequest) =>
    api.post<CreateUserResponse>("/users", user);

const getOwn = () => api.get<UserResponse>("/users/own");

const updateOwn = (user: User) => api.put<UserResponse>("/users/own", user);

const updatePassword = (request: UpdatePasswordRequest) => api.put<void>("/users/own/password", request);

const search = (query: string, excludeChatId?: string, excludeAuthenticated?: boolean) => api.get<User[]>("/users/search", {params: {q: query, excludeChatId, excludeAuthenticated}})

const isEmailAvailable = (email?: string, excludeAuthenticated?: boolean) => email ? api.get<boolean>("/users/exists", {params: {email, excludeAuthenticated}}).then(res => !res.data) : Promise.resolve(true);

const UserService = {
    create,
    getOwn,
    updateOwn,
    updatePassword,
    search,
    isEmailAvailable
};

export default UserService;
