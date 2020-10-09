import { ThunkAction } from "redux-thunk";
import MessageService, { PostMessageRequest, PostMessageResponse } from "../../services/MessageService";
import { RootAction, RootState } from "../rootReducer";
import MessageAction, { POST_MESSAGE } from "./messageActionTypes";

const _postMessage = (message: PostMessageResponse): MessageAction => ({
    type: POST_MESSAGE,
    payload: {
        message
    }
})

export const postMessage: (chatId: string, message: PostMessageRequest) => ThunkAction<Promise<void>, RootState, void, RootAction> = (chatId, message) => dispatch => 
    MessageService.postMessage(chatId, message).then(res => {
        dispatch(_postMessage(res.data));
    })