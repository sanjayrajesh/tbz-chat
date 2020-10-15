import { ThunkAction } from "redux-thunk";
import ChatService, { ChatResponse, CreateChatRequest } from "../../services/ChatService";
import { RootAction, RootState } from "../rootReducer";
import ChatAction, { CREATE_CHAT, LEAVE_CHAT, MAKE_ADMINISTRATOR, REMOVE_FROM_CHAT, SELECT_CHAT } from "./chatActionTypes";

export const selectChat = (id: string): ChatAction => ({
    type: SELECT_CHAT,
    payload: {
        id
    }
})

const _makeAdministrator = (userId: string, chatId: string): ChatAction => ({
    type: MAKE_ADMINISTRATOR,
    payload: {
        userId,
        chatId
    }
})

const _removeFromChat = (userId: string, chatId: string): ChatAction => ({
    type: REMOVE_FROM_CHAT,
    payload: {
        userId,
        chatId
    }
})

const _leaveChat = (chatId: string): ChatAction => ({
    type: LEAVE_CHAT,
    payload: {
        chatId
    }
})

const _createChat = (chat: ChatResponse): ChatAction => ({
    type: CREATE_CHAT,
    payload: {
        chat
    }
})

export const makeAdministrator: (userId: string, chatId: string) => ThunkAction<Promise<void>, RootState, void, RootAction> = (userId, chatId) => dispatch => ChatService.makeAdministrator(userId, chatId).then(() => {
    dispatch(_makeAdministrator(userId, chatId));
})

export const removeFromChat: (userId: string, chatId: string) => ThunkAction<Promise<void>, RootState, void, RootAction> = (userId, chatId) => dispatch => ChatService.removeFromChat(userId, chatId).then(() => {
    dispatch(_removeFromChat(userId, chatId));
})

export const leaveChat: (chatId: string) => ThunkAction<Promise<void>, RootState, void, RootAction> = chatId => dispatch => ChatService.leaveChat(chatId).then(() => {
    dispatch(_leaveChat(chatId));
})

export const createChat: (chat: CreateChatRequest) => ThunkAction<Promise<void>, RootState, void, RootAction> = chat => dispatch => ChatService.create(chat).then(res => {
    dispatch(_createChat(res.data))
})