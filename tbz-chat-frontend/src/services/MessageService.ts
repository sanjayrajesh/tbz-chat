import Message from "../models/Message";
import api from "./api";

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