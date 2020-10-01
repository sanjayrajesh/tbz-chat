import { ThunkAction } from "redux-thunk";
import Chat from "../models/Chat";
import Message from "../models/Message";
import User from "../models/User";
import UserInChat from "../models/UserInChat";
import LoginService, { LoginRequest } from "../services/LoginService";
import EntityMap from "../util/EntityMap";
import { authFailure, authSuccess } from "./auth/authActions";
import { RootAction, RootState } from "./rootReducer";
import moment from 'moment';
import { setChats } from "./chat/chatActions";
import { setUsers } from "./user/userActions";
import { setMessages } from "./message/messageActions";
import { setUserInChats } from "./userInChat/userInChatActions";

export const login: (login: LoginRequest) => ThunkAction<Promise<void>, RootState, void, RootAction> = login => async dispatch => {
    try {
        const userResponse = await LoginService.login(login);

        dispatch(authSuccess(userResponse));

        let chats: EntityMap<Chat> = {};
        let users: EntityMap<User> = {};
        let messages: EntityMap<Message> = {};
        let userInChats: UserInChat[] = [];

        userResponse.data.chats.forEach(chatResponse => {
            const chat: Chat = {
                id: chatResponse.id,
                name: chatResponse.name,
                role: chatResponse.role,
                messageIds: []
            }

            chatResponse.users.forEach(userResponse => {
                const user: User = {
                    id: userResponse.id,
                    email: userResponse.email,
                    username: userResponse.username
                }

                users[user.id] = user;
                userInChats.push({
                    userId: user.id,
                    chatId: chat.id,
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
        dispatch(setUserInChats(userInChats));

    } catch (err) {
        dispatch(authFailure());
    }
}