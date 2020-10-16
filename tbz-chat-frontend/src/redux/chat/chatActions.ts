import { ThunkAction } from "redux-thunk";
import User from "../../models/User";
import ChatService, { AddChatMembersResponse, ChatResponse, CreateChatRequest } from "../../services/ChatService";
import { RootAction, RootState } from "../rootReducer";
import ChatAction, { ADD_CHAT_MEMBERS, CREATE_CHAT, LEAVE_CHAT, MAKE_ADMINISTRATOR, REMOVE_FROM_CHAT, SELECT_CHAT } from "./chatActionTypes";

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

const _addChatMembers = (chatId: string, users: AddChatMembersResponse): ChatAction => ({
    type: ADD_CHAT_MEMBERS,
    payload: {
        chatId,
        users
    }
})

export const makeAdministrator: (userId: string, chatId: string, beforeDispatch?: () => void) => ThunkAction<Promise<void>, RootState, void, RootAction> = (userId, chatId, beforeDispatch) => dispatch => ChatService.makeAdministrator(userId, chatId).then(() => {
    if(beforeDispatch) {
        beforeDispatch();
    }
    dispatch(_makeAdministrator(userId, chatId));
})

export const removeFromChat: (userId: string, chatId: string, beforeDispatch?: () => void) => ThunkAction<Promise<void>, RootState, void, RootAction> = (userId, chatId, beforeDispatch) => dispatch => ChatService.removeFromChat(userId, chatId).then(() => {
    if(beforeDispatch) {
        beforeDispatch();
    }
    dispatch(_removeFromChat(userId, chatId));
})

export const leaveChat: (chatId: string) => ThunkAction<Promise<void>, RootState, void, RootAction> = chatId => dispatch => ChatService.leaveChat(chatId).then(() => {
    dispatch(_leaveChat(chatId));
})

export const createChat: (chat: CreateChatRequest) => ThunkAction<Promise<void>, RootState, void, RootAction> = chat => dispatch => ChatService.create(chat).then(res => {
    dispatch(_createChat(res.data))
})

export const addChatMembers: (chatId: string, users: User[], beforeDispatch?: () => void) => ThunkAction<Promise<void>, RootState, void, RootAction> = (chatId, users, beforeDispatch) => dispatch => ChatService.addMembers(chatId, users.map(user => user.id)).then(res => {
    if(beforeDispatch) {
        beforeDispatch();
    }
    dispatch(_addChatMembers(chatId, res.data))
})