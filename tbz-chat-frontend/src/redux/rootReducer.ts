import { combineReducers } from "redux";
import AuthAction from "./auth/authActionTypes";
import authReducer from "./auth/authReducer";
import ChatAction from "./chat/chatActionTypes";
import chatReducer from "./chat/chatReducer";
import MessageAction from "./message/messageActionTypes";
import messageReducer from "./message/messageReducer";
import UserAction from "./user/userActionTypes";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    users: userReducer,
    chats: chatReducer,
    messages: messageReducer,
    auth: authReducer
});

export type RootAction = UserAction | ChatAction | MessageAction | AuthAction

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;