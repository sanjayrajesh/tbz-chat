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

export interface ChatResponse extends Entity {
    name: string;
    role: Role;
    messages: MessageResponse[];
    users: (User & {role: Role})[];
}

const create = (chat: CreateChatRequest) => api.post<ChatResponse>("/chats", chat);

const makeAdministrator = (userId: string, chatId: string) => api.put<MakeAdministratorResponse>(`/chats/${chatId}/users/${userId}/grant-admin-role`);

const removeFromChat = (userId: string, chatId: string) => api.delete<undefined>(`/chats/${chatId}/users/${userId}`);

const leaveChat = (chatId: string) => api.delete<undefined>(`users/own/chats/${chatId}`);

const ChatService = {
    create,
    makeAdministrator,
    removeFromChat,
    leaveChat
}

export default ChatService