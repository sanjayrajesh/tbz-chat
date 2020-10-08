import { ThunkAction } from "redux-thunk";
import ChatService from "../../services/ChatService";
import { RootAction, RootState } from "../rootReducer";
import ChatAction, { MAKE_ADMINISTRATOR, REMOVE_FROM_CHAT, SELECT_CHAT } from "./chatActionTypes";

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

export const makeAdministrator: (userId: string, chatId: string) => ThunkAction<Promise<void>, RootState, void, RootAction> = (userId, chatId) => dispatch => ChatService.makeAdministrator(userId, chatId).then(() => {
    dispatch(_makeAdministrator(userId, chatId));
})

export const removeFromChat: (userId: string, chatId: string) => ThunkAction<Promise<void>, RootState, void, RootAction> = (userId, chatId) => dispatch => ChatService.removeFromChat(userId, chatId).then(() => {
    dispatch(_removeFromChat(userId, chatId));
})