import UserInChat from "../../models/UserInChat";
import UserInChatAction, { SET_USER_IN_CHATS } from "./userInChatActionTypes";

export type UserInChatState = UserInChat[]

const initialState: UserInChatState = []

const userInChatReducer = (state: UserInChatState | undefined = initialState, action: UserInChatAction): UserInChatState => {
    switch (action.type) {
        case SET_USER_IN_CHATS:
            return [...action.payload.userInChats]
        default:
            return state;
    }
}

export default userInChatReducer;