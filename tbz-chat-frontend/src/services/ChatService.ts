import Role from "../models/Role";
import User from "../models/User";
import api from "./api";

interface MakeAdministratorResponse extends User {
    role: Role
}

const makeAdministrator = (userId: string, chatId: string) => api.put<MakeAdministratorResponse>(`/chats/${chatId}/users/${userId}/grant-admin-role`);

const removeFromChat = (userId: string, chatId: string) => api.delete<undefined>(`/chats/${chatId}/users/${userId}`);

const ChatService = {
    makeAdministrator,
    removeFromChat
}

export default ChatService