import Message from "../../models/Message";
import EntityMap from "../../util/EntityMap";
import MessageAction, { SET_MESSAGES } from "./messageActionTypes";

export const setMessages = (messages: EntityMap<Message>): MessageAction => ({
    type: SET_MESSAGES,
    payload: {
        messages
    }
})