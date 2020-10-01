import Message from "../../models/Message";
import EntityState, { createInitialState } from "../../util/EntityState";
import MessageAction, { SET_MESSAGES } from "./messageActionTypes";

type MessageState = EntityState<Message>

const initialState: MessageState = createInitialState();

const messageReducer = (state: MessageState | undefined = initialState, action: MessageAction): MessageState => {
    switch (action.type) {
        case SET_MESSAGES:
            const messageMap = action.payload.messages;

            return {
                ...state,
                byId: messageMap,
                allIds: Object.keys(messageMap)
            }
        default:
            return state;
    }
}

export default messageReducer;