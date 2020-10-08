export const SELECT_CHAT = 'SELECT_CHAT'
export const MAKE_ADMINISTRATOR = 'MAKE_ADMINISTRATOR'
export const REMOVE_FROM_CHAT = 'REMOVE_FROM_CHAT'

type SelectChat = {
    type: typeof SELECT_CHAT,
    payload: {
        id: string
    }
}

type MakeAdministrator = {
    type: typeof MAKE_ADMINISTRATOR,
    payload: {
        chatId: string,
        userId: string
    }
}

type RemoveFromChat = {
    type: typeof REMOVE_FROM_CHAT,
    payload: {
        chatId: string,
        userId: string
    }
}

type ChatAction = SelectChat | MakeAdministrator | RemoveFromChat;

export default ChatAction