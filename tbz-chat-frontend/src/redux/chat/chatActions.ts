import Chat from "../../models/Chat";
import EntityMap from "../../util/EntityMap";
import ChatAction, { SET_CHATS } from "./chatActionTypes";

export const setChats = (chats: EntityMap<Chat>): ChatAction => ({
    type: SET_CHATS,
    payload: {
        chats
    }
})