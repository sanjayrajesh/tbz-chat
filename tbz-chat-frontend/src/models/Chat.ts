import Entity from "./Entity";
import Role from "./Role";
import UserInChat from "./UserInChat";

export interface CreateChat {
    name: string,
    userIds: string[]
}

interface Chat extends Entity {
    name: string,
    role: Role,
    messageIds: string[],
    users: UserInChat[]
}

export default Chat;