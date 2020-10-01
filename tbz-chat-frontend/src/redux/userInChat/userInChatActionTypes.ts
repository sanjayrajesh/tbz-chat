import UserInChat from "../../models/UserInChat";

export const SET_USER_IN_CHATS = 'SET_USER_IN_CHATS';

type SetUserInChats = {
    type: typeof SET_USER_IN_CHATS,
    payload: {
        userInChats: UserInChat[]
    }
}

type UserInChatAction = SetUserInChats;

export default UserInChatAction;