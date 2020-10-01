import Chat from "../../models/Chat";
import EntityState, { createInitialState } from "../../util/EntityState";
import ChatAction, { SET_CHATS } from "./chatActionTypes";

export type ChatState = EntityState<Chat>

const initialState: ChatState = createInitialState();

const chatReducer = (state: ChatState | undefined = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case SET_CHATS:
            const chatMap = action.payload.chats;

            return {
                ...state,
                byId: chatMap,
                allIds: Object.keys(chatMap)
            }
        default:
            return state;
    }
}

export default chatReducer;