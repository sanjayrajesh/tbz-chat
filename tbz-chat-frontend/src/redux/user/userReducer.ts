import User from "../../models/User";
import { ChatResponse } from "../../services/ChatService";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { CREATE_CHAT } from "../chat/chatActionTypes";
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
        allIds: Object.keys(byId)
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
        allIds: Object.keys(byId)
    }
}

const userReducer = (state: UserState | undefined = initialState, action: RootAction): UserState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        case CREATE_CHAT:
            return createChat(state, action.payload.chat);
        default:
            return state;
    }
}

export default userReducer;