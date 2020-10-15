import Entity from "../models/Entity";
import User from "../models/User";
import api from "./api";

export interface MessageResponse extends Entity {
    timestamp: string;
    body: string;
    author: User;
}

export interface PostMessageRequest {
    body: string
}

export interface PostMessageResponse extends MessageResponse {
    chatId: string
}

const postMessage = (chatId: string, message: PostMessageRequest) => api.post<PostMessageResponse>(`/chats/${chatId}/messages`, message);

const MessageService = {
    postMessage
}

export default MessageService