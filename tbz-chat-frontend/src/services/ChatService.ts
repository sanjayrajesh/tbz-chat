import Entity from "../models/Entity";
import Role from "../models/Role";
import User from "../models/User";
import api from "./api";
import { MessageResponse } from "./MessageService";

interface MakeAdministratorResponse extends User {
    role: Role
}

export interface CreateChatRequest {
    name: string;
    userIds: string[];
}

export interface AddChatMembersRequest extends Array<string> {

}

export interface AddChatMembersResponse extends Array<User & {role: Role}> {

}

export interface ChatResponse extends Entity {
    name: string;
    role: Role;
    messages: MessageResponse[];
    users: (User & {role: Role})[];
    createdAt: string;
}

const getOwn = () => api.get<ChatResponse[]>("/users/own/chats");

const create = (chat: CreateChatRequest) => api.post<ChatResponse>("/chats", chat);

const addMembers = (chatId: string, userIds: AddChatMembersRequest) => api.post<AddChatMembersResponse>(`/chats/${chatId}/users`, userIds);

const makeAdministrator = (userId: string, chatId: string) => api.put<MakeAdministratorResponse>(`/chats/${chatId}/users/${userId}/grant-admin-role`);

const removeFromChat = (userId: string, chatId: string) => api.delete<undefined>(`/chats/${chatId}/users/${userId}`);

const leaveChat = (chatId: string) => api.delete<undefined>(`users/own/chats/${chatId}`);

const ChatService = {
    getOwn,
    create,
    addMembers,
    makeAdministrator,
    removeFromChat,
    leaveChat
}

export default ChatService