import Message from "../../models/Message";
import EntityMap from "../../util/EntityMap";

export const SET_MESSAGES = 'SET_MESSAGES';

type SetMessages = {
    type: typeof SET_MESSAGES,
    payload: {
        messages: EntityMap<Message>
    }
}

type MessageAction = SetMessages;

export default MessageAction;