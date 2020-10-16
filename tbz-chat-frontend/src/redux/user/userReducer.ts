import User from "../../models/User";
import { AddChatMembersResponse, ChatResponse } from "../../services/ChatService";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { ADD_CHAT_MEMBERS, CREATE_CHAT, UPDATE_CHATS } from "../chat/chatActionTypes";
import { RootAction } from "../rootReducer";

export type UserState = EntityState<User>

const initialState: UserState = createInitialState();

const pureUser = (user: User): User => {
    return {
        id: user.id,
        email: user.email,
        username: user.username
    }
}

const populateFromUserResponse = (state: UserState, response: UserResponse): UserState => {

    let byId: EntityMap<User> = {};

    response.chats.forEach(chat => {
        chat.users.forEach(user => {

            byId[user.id] = pureUser(user);
        })

        chat.messages.forEach(message => {
            byId[message.author.id] = pureUser(message.author);
        })
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId).sort()
    }
}

const updateChats = (state: UserState, chats: ChatResponse[]): UserState => {
    let byId: EntityMap<User> = {};

    chats.forEach(chat => {
        chat.users.forEach(user => {
            byId[user.id] = pureUser(user);
        })

        chat.messages.forEach(message => {
            byId[message.author.id] = pureUser(message.author);
        })
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId).sort()
    }
}

const createChat = (state: UserState, chatResponse: ChatResponse): UserState => {

    let byId = {...state.byId};

    chatResponse.users.forEach(user => {
        if(!byId[user.id]) {
            byId[user.id] = pureUser(user);
        }
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId).sort()
    }
}

const addChatMembers = (state: UserState, members: AddChatMembersResponse): UserState => {
    if(members.length === 0) return state;

    let byId = {
        ...state.byId
    }

    members.forEach(member => {
        if(!(member.id in byId)) {
            byId[member.id] = pureUser(member);
        }
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId).sort()
    }
}

const userReducer = (state: UserState | undefined = initialState, action: RootAction): UserState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        case UPDATE_CHATS:
            return updateChats(state, action.payload.chats);
        case CREATE_CHAT:
            return createChat(state, action.payload.chat);
        case ADD_CHAT_MEMBERS:
            return addChatMembers(state, action.payload.users);
        default:
            return state;
    }
}

export default userReducer;