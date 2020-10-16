import { AddChatMembersResponse, ChatResponse } from "../../services/ChatService"

export const SELECT_CHAT = 'SELECT_CHAT'
export const MAKE_ADMINISTRATOR = 'MAKE_ADMINISTRATOR'
export const REMOVE_FROM_CHAT = 'REMOVE_FROM_CHAT'
export const LEAVE_CHAT = 'LEAVE_CHAT'
export const CREATE_CHAT = "CREATE_CHAT"
export const ADD_CHAT_MEMBERS = "ADD_CHAT_MEMBERS"

type SelectChat = {
    type: typeof SELECT_CHAT,
    payload: {
        id: string
    }
}

type MakeAdministrator = {
    type: typeof MAKE_ADMINISTRATOR,
    payload: {
        chatId: string,
        userId: string
    }
}

type RemoveFromChat = {
    type: typeof REMOVE_FROM_CHAT,
    payload: {
        chatId: string,
        userId: string
    }
}

type LeaveChat = {
    type: typeof LEAVE_CHAT,
    payload: {
        chatId: string
    }
}

type CreateChat = {
    type: typeof CREATE_CHAT;
    payload: {
        chat: ChatResponse;
    }
}

type AddChatMembers = {
    type: typeof ADD_CHAT_MEMBERS;
    payload: {
        chatId: string;
        users: AddChatMembersResponse;
    }
}

type ChatAction = SelectChat | MakeAdministrator | RemoveFromChat | LeaveChat | CreateChat | AddChatMembers;

export default ChatAction