import Entity from "../models/Entity";
import Message from "../models/Message";
import api from "./api";

export interface MessageResponse extends Entity {
    timestamp: string;
    body: string;
    authorId: string;
}

export interface PostMessageRequest {
    body: string
}

export interface PostMessageResponse extends Message {
    chatId: string
}

const postMessage = (chatId: string, message: PostMessageRequest) => api.post<PostMessageResponse>(`/chats/${chatId}/messages`, message);

const MessageService = {
    postMessage
}

export default MessageService