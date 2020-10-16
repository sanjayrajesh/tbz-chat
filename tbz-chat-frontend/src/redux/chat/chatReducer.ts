import moment, { Moment } from "moment";
import Chat from "../../models/Chat";
import { ADMINISTRATOR } from "../../models/Role";
import { AddChatMembersResponse, ChatResponse } from "../../services/ChatService";
import { PostMessageResponse } from "../../services/MessageService";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { POST_MESSAGE } from "../message/messageActionTypes";
import { RootAction } from "../rootReducer";
import { ADD_CHAT_MEMBERS, CREATE_CHAT, LEAVE_CHAT, MAKE_ADMINISTRATOR, REMOVE_FROM_CHAT, SELECT_CHAT, UPDATE_CHATS } from "./chatActionTypes";

export type ChatState = EntityState<Chat> & {
    selected?: string
}

const initialState: ChatState = createInitialState();

const pureChat = (chat: Chat): Chat => ({
    id: chat.id,
    name: chat.name,
    users: chat.users,
    messageIds: chat.messageIds,
    role: chat.role,
    createdAt: chat.createdAt
})

const getLatestTimestamp = (chat: ChatResponse): Moment => {
    if(chat.messages.length === 0) return moment(chat.createdAt);

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
            users: {},
            createdAt: moment(chatResponse.createdAt)
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
        allIds: Object.keys(byId).sort(),
        selected: getLatestChat(response.chats)
    }
}

const updateChats = (state: ChatState, chats: ChatResponse[]): ChatState => {
    let byId: EntityMap<Chat> = {};

    chats.forEach(chatResponse => {
        const chat: Chat = {
            ...chatResponse,
            messageIds: [],
            users: {},
            createdAt: moment(chatResponse.createdAt)
        }

        chatResponse.users.forEach(user => {
            chat.users[user.id] = user.role;
        })

        chatResponse.messages.forEach(message => {
            chat.messageIds.push(message.id);
        })

        byId[chat.id] = pureChat(chat);
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId).sort()
    }
}

const makeAdministrator = (state: ChatState, chatId: string, userId: string): ChatState => {
    return {
        ...state,
        byId: {
            ...state.byId,
            [chatId]: {
                ...state.byId[chatId],
                users: {
                    ...state.byId[chatId].users,
                    [userId]: ADMINISTRATOR
                }
            }
        }
    }
}

const removeUser = (state: ChatState, payload: {userId: string, chatId: string}): ChatState => {

    const {userId, chatId} = payload;

    const users = {...state.byId[chatId].users};

    delete users[userId];

    return {
        ...state,
        byId: {
            ...state.byId,
            [chatId]: {
                ...state.byId[chatId],
                users
            }
        },
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

    const allIds = Object.keys(byId).sort();

    return {
        ...state,
        byId,
        allIds,
        selected: allIds[0]
    }
}

const createChat = (state: ChatState, chatResponse: ChatResponse): ChatState => {
    let byId = {...state.byId};

    const chat: Chat = {
        ...chatResponse,
        users: {},
        messageIds: [],
        createdAt: moment(chatResponse.createdAt)
    }

    chatResponse.users.forEach(user => {
        chat.users[user.id] = user.role;
    });

    byId[chat.id] = chat;

    return {
        ...state,
        byId,
        allIds: Object.keys(byId).sort(),
        selected: chat.id
    };
}

const addChatMembers = (state: ChatState, chatId: string, members: AddChatMembersResponse): ChatState => {
    if(members.length === 0) return state;

    let users = {...state.byId[chatId].users}

    members.forEach(user => {
        users[user.id] = user.role
    })

    return {
        ...state,
        byId: {
            ...state.byId,
            [chatId]: {
                ...state.byId[chatId],
                users
            }
        }
    }
}

const chatReducer = (state: ChatState | undefined = initialState, action: RootAction): ChatState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        case UPDATE_CHATS:
            return updateChats(state, action.payload.chats);
        case SELECT_CHAT:
            return {
                ...state,
                selected: action.payload.id
            }
        case MAKE_ADMINISTRATOR:
            return makeAdministrator(state, action.payload.chatId, action.payload.userId);
        case REMOVE_FROM_CHAT:
            return removeUser(state, action.payload);
        case POST_MESSAGE:
            return addMessage(state, action.payload.message);
        case LEAVE_CHAT:
            return leaveChat(state, action.payload.chatId);
        case CREATE_CHAT:
            return createChat(state, action.payload.chat);
        case ADD_CHAT_MEMBERS:
            return addChatMembers(state, action.payload.chatId, action.payload.users);
        default:
            return state;
    }
}

export default chatReducer;