import UserInChat from "../../models/UserInChat";
import UserInChatAction, { SET_USER_IN_CHATS } from "./userInChatActionTypes";

export const setUserInChats = (userInChats: UserInChat[]): UserInChatAction => ({
    type: SET_USER_IN_CHATS,
    payload: {
        userInChats
    }
})