import { combineReducers } from "redux";
import AuthAction from "./auth/authActionTypes";
import authReducer from "./auth/authReducer";
import ChatAction from "./chat/chatActionTypes";
import chatReducer from "./chat/chatReducer";
import MessageAction from "./message/messageActionTypes";
import messageReducer from "./message/messageReducer";
import UserAction from "./user/userActionTypes";
import userReducer from "./user/userReducer";
import UserInChatAction from "./userInChat/userInChatActionTypes";
import userInChatReducer from "./userInChat/userInChatReducer";

const rootReducer = combineReducers({
    users: userReducer,
    chats: chatReducer,
    messages: messageReducer,
    userInChats: userInChatReducer,
    auth: authReducer
});

export type RootAction = UserAction | ChatAction | MessageAction | UserInChatAction | AuthAction

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;