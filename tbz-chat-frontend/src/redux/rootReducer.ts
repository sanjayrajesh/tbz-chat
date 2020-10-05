import { combineReducers } from "redux";
import AuthAction from "./auth/authActionTypes";
import authReducer from "./auth/authReducer";
import chatReducer from "./chat/chatReducer";
import messageReducer from "./message/messageReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    users: userReducer,
    chats: chatReducer,
    messages: messageReducer,
    auth: authReducer
});

export type RootAction = AuthAction

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;