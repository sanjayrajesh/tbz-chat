import { PostMessageResponse } from "../../services/MessageService"

export const POST_MESSAGE = 'POST_MESSAGE'

type PostMessage = {
    type: typeof POST_MESSAGE,
    payload: {
        message: PostMessageResponse
    }
}

type MessageAction = PostMessage

export default MessageAction