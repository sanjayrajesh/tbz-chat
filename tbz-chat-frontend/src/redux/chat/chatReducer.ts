import moment, { Moment } from "moment";
import Chat from "../../models/Chat";
import Entity from "../../models/Entity";
import { ADMINISTRATOR } from "../../models/Role";
import { PostMessageResponse } from "../../services/MessageService";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { POST_MESSAGE } from "../message/messageActionTypes";
import { RootAction } from "../rootReducer";
import { LEAVE_CHAT, MAKE_ADMINISTRATOR, REMOVE_FROM_CHAT, SELECT_CHAT } from "./chatActionTypes";

export type ChatState = EntityState<Chat> & {
    selected?: string
}

const initialState: ChatState = createInitialState();

interface ChatResponse extends Entity {
    messages: {
        timestamp: string
    }[]
}

const getLatestTimestamp = (chat: ChatResponse): Moment | undefined => {
    if(chat.messages.length === 0) return undefined

    return chat.messages.map(message => ({
        ...message, timestamp: moment(message.timestamp)
    })).reduce((prev, current) => {
        if(current.timestamp.isAfter(prev.timestamp)) return current;
        else return prev;
    }).timestamp
}

const getLatestChat = (chats: ChatResponse[]): string | undefined => {

    if(chats.length === 0) {
        return undefined;
    }

    const chatsWithLatestMessage = chats.map(chat => ({
        id: chat.id,
        timestamp: getLatestTimestamp(chat)
    }))

    return chatsWithLatestMessage.reduce((prev, current) => {
        if(current.timestamp && current.timestamp.isAfter(prev.timestamp)) return current;
         else return prev;
    }).id
}

const populateFromUserResponse = (state: ChatState, response: UserResponse): ChatState => {
    let byId: EntityMap<Chat> = {};

    response.chats.forEach(chatResponse => {
        const chat: Chat = {
            id: chatResponse.id,
            name: chatResponse.name,
            role: chatResponse.role,
            messageIds: [],
            users: {}
        }

        chatResponse.users.forEach(userResponse => {
            chat.users[userResponse.id] = userResponse.role
        })

        chatResponse.messages.forEach(messageResponse => {
            chat.messageIds.push(messageResponse.id)
        })

        byId[chat.id] = chat;
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId),
        selected: getLatestChat(response.chats)
    }
}

const removeUser = (state: ChatState, payload: {userId: string, chatId: string}): ChatState => {

    const {userId, chatId} = payload;

    const chat = state.byId[chatId];

    delete chat.users[userId];

    return {
        ...state,
        byId: {
            ...state.byId,
            [chatId]: chat
        },
        selected: undefined
    }
}

const addMessage = (state: ChatState, message: PostMessageResponse): ChatState => {
    let chat = state.byId[message.chatId];

    chat.messageIds = [...chat.messageIds, message.id];

    return {
        ...state,
        byId: {
            ...state.byId,
            [chat.id]: chat
        }
    }
}

const leaveChat = (state: ChatState, chatId: string): ChatState => {

    let byId = state.byId;

    delete byId[chatId];

    const allIds = Object.keys(byId);

    return {
        ...state,
        byId,
        allIds,
        selected: allIds[0]
    }
}

const chatReducer = (state: ChatState | undefined = initialState, action: RootAction): ChatState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        case SELECT_CHAT:
            return {
                ...state,
                selected: action.payload.id
            }
        case MAKE_ADMINISTRATOR:
            const {userId, chatId} = action.payload

            let byId = state.byId;

            byId[chatId].users[userId] = ADMINISTRATOR;

            return {
                ...state,
                byId
            }
        case REMOVE_FROM_CHAT:
            return removeUser(state, action.payload);
        case POST_MESSAGE:
            return addMessage(state, action.payload.message);
        case LEAVE_CHAT:
            return leaveChat(state, action.payload.chatId);
        default:
            return state;
    }
}

export default chatReducer;