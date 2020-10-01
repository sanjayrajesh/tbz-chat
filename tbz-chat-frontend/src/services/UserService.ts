import Role from "../models/Role";
import api from "./api";
import Response from "./Response";

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

const create = (user: CreateUserRequest): Response<CreateUserResponse> =>
    api.post<CreateUserResponse>("/users", user);

const UserService = {
    create,
};

export default UserService;
