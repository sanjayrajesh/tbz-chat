import Role from "../models/Role";
import User from "../models/User";
import api from "./api";

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
    chats: {
        id: string;
        name: string;
        role: Role;
        messages: {
            id: string;
            body: string;
            timestamp: string;
            authorId: string;
        }[];
        users: {
            id: string;
            email: string;
            username: string | null;
            role: Role;
        }[];
    }[];
}

const create = (user: CreateUserRequest) =>
    api.post<CreateUserResponse>("/users", user);

const getOwn = () => api.get<UserResponse>("/users/own");

const search = (query: string, excludeChatId?: string) => api.get<User[]>("/users/search", {params: {q: query, excludeChatId}})

const UserService = {
    create,
    getOwn,
    search
};

export default UserService;
