import Chat from "../../models/Chat";
import EntityMap from "../../util/EntityMap";

export const SET_CHATS = 'SET_CHATS'

type SetChats = {
    type: typeof SET_CHATS,
    payload: {
        chats: EntityMap<Chat>
    }
}

type ChatAction = SetChats;

export default ChatAction;