import Chat from "../../models/Chat";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { RootAction } from "../rootReducer";

export type ChatState = EntityState<Chat>

const initialState: ChatState = createInitialState();

const populateFromUserResponse = (state: ChatState, response: UserResponse): ChatState => {
    let byId: EntityMap<Chat> = {};

    response.chats.forEach(chatResponse => {
        const chat: Chat = {
            id: chatResponse.id,
            name: chatResponse.name,
            role: chatResponse.role,
            messageIds: [],
            users: []
        }

        chatResponse.users.forEach(userResponse => {
            chat.users.push({
                userId: userResponse.id,
                role: userResponse.role
            })
        })

        chatResponse.messages.forEach(messageResponse => {
            chat.messageIds.push(messageResponse.id)
        })

        byId[chat.id] = chat;
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId)
    }
}

const chatReducer = (state: ChatState | undefined = initialState, action: RootAction): ChatState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        default:
            return state;
    }
}

export default chatReducer;