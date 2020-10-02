import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Chat from "../models/Chat";
import Message from "../models/Message";
import User from "../models/User";
import LoginService, { LoginRequest } from "../services/LoginService";
import EntityMap from "../util/EntityMap";
import { authFailure, authSuccess, loginFailure, loginSuccess } from "./auth/authActions";
import { RootAction, RootState } from "./rootReducer";
import moment from 'moment';
import { setChats } from "./chat/chatActions";
import { setUsers } from "./user/userActions";
import { setMessages } from "./message/messageActions";
import UserService, { UserResponse } from "../services/UserService";

const populateState = (dispatch: ThunkDispatch<RootState, void, RootAction>, userResponse: UserResponse) => {
    let chats: EntityMap<Chat> = {};
        let users: EntityMap<User> = {};
        let messages: EntityMap<Message> = {};

        userResponse.chats.forEach(chatResponse => {
            const chat: Chat = {
                id: chatResponse.id,
                name: chatResponse.name,
                role: chatResponse.role,
                messageIds: [],
                users: []
            }

            chatResponse.users.forEach(userResponse => {
                const user: User = {
                    id: userResponse.id,
                    email: userResponse.email,
                    username: userResponse.username
                }

                users[user.id] = user;
                chat.users.push({
                    userId: user.id,
                    role: userResponse.role
                })
            })

            chatResponse.messages.forEach(messageResponse => {
                const message: Message = {
                    ...messageResponse,
                    timestamp: moment(messageResponse.timestamp)
                }

                messages[message.id] = message;
                chat.messageIds.push(message.id);
            })

            chats[chat.id] = chat;
        })

        dispatch(setChats(chats));
        dispatch(setUsers(users));
        dispatch(setMessages(messages));

        return
}

export const authenticateFromToken: () => ThunkAction<Promise<void>, RootState, void, RootAction> = () => async dispatch => {
    try {
        const response = await UserService.getOwn();

        dispatch(authSuccess(response));

        populateState(dispatch, response.data);
    } catch (error) {
        dispatch(authFailure());
    }
}

export const login: (login: LoginRequest) => ThunkAction<Promise<void>, RootState, void, RootAction> = login => async dispatch => {
    try {
        const response = await LoginService.login(login);

        dispatch(loginSuccess(response));

        await populateState(dispatch, response.data);

    } catch (err) {
        dispatch(loginFailure());
        throw err;
    }
}