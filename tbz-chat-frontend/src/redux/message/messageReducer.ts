import Message from "../../models/Message";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { RootAction } from "../rootReducer";
import moment from 'moment';
import { POST_MESSAGE } from "./messageActionTypes";

type MessageState = EntityState<Message>

const initialState: MessageState = createInitialState();

const populateFromUserResponse = (state: MessageState, response: UserResponse): MessageState => {

    let byId: EntityMap<Message> = {};

    response.chats.forEach(chat => {
        chat.messages.forEach(message => {
            byId[message.id] = {
                ...message,
                timestamp: moment(message.timestamp)
            }
        })
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId)
    }
}

const messageReducer = (state: MessageState | undefined = initialState, action: RootAction): MessageState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        case POST_MESSAGE:
            const message = action.payload.message

            let byId = state.byId;

            byId[message.id] = {
                ...message,
                timestamp: moment(message.timestamp)
            }

            return {
                ...state,
                byId,
                allIds: Object.keys(byId)
            }
        default:
            return state;
    }
}

export default messageReducer;