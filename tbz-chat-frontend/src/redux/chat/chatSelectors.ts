import { createSelector } from "reselect";
import Chat from "../../models/Chat";
import Message from "../../models/Message";
import Role, { ADMINISTRATOR } from "../../models/Role";
import User from "../../models/User";
import Comparator from "../../util/Comparator";
import { momentCompare } from "../../util/dateTime";
import EntityMap from "../../util/EntityMap";
import Selector from "../../util/Selector";
import SelectorWithProps from "../../util/SelectorWithProps";
import { getOwnId } from "../auth/authSelectors";
import { getMessages } from "../message/messageSelectors";
import { RootState } from "../rootReducer";
import { getUsers } from "../user/userSelectors";

interface LatestMessage {
    id: Message["id"];
        body: Message["body"];
        authorName: string;
        timestamp: Message["timestamp"];
}

export interface ChatPreview {
    id: Chat["id"];
    name: Chat["name"];
    latestMessage?: LatestMessage;
    createdAt: Chat["createdAt"];
}

export interface ChatMember extends User {
    role: Role;
}

export const getChat: SelectorWithProps<Chat | undefined, string> = (state, id) => state.chats.byId[id];

export const getChats: Selector<EntityMap<Chat>> = state => state.chats.byId;

export const getSelectedChatId: Selector<string | undefined> = state => state.chats.selected;

export const getSelectedChat = createSelector(
    [getSelectedChatId, getChats],
    (id, chats) => id ? chats[id] : undefined
)

const getFilteredChats = (state: RootState, filter: string) => {
    const chats = Object.values(state.chats.byId)

    if(!filter) return chats;

    filter = filter.toLocaleLowerCase();

    return chats.filter(chat => chat.name.toLocaleLowerCase().includes(filter))
}

const getLatestMessage = (messages: Message[]): Message | undefined => {
    if(messages.length === 0) return undefined;

    return messages.reduce((prev, current) => current.timestamp.isAfter(prev.timestamp) ? current : prev);
}

export const getChatPreviews = createSelector(
    [getFilteredChats, getMessages, getUsers],
    (chats, messages, users): ChatPreview[] => {
        if(chats.length === 0) return [];

        return chats.map((chat): ChatPreview => {
            const latestMessage = getLatestMessage(chat.messageIds.map(id => messages[id]));

            if(latestMessage) {
                const author = users[latestMessage.authorId];

                return {
                    ...chat,
                    latestMessage: {
                        ...latestMessage,
                        authorName: author.username || author.email
                    }
                }
            } else return chat;
        }).sort((a, b) => momentCompare(b.latestMessage?.timestamp || b.createdAt, a.latestMessage?.timestamp || a.createdAt))
    }
)

const userCompare: Comparator<User> = (a, b) => {
    const aName = a.username || a.email;
    const bName = b.username || b.email;

    return aName.localeCompare(bName);
}

const memberCompare = (ownId: string): Comparator<ChatMember> => (a, b) => {
    if(a.id === ownId) return -1;
    else if (b.id === ownId) return 1;
    else if(a.role === b.role) return userCompare(a, b);
    else if (a.role === ADMINISTRATOR) return -1;
    else return 1
}

export const getSelectedChatMembers = createSelector(
    [getSelectedChat, getUsers, getOwnId],
    (chat, users, ownId): ChatMember[] => {
        if(!chat) return [];

        return Object.entries(chat.users).map(([id, role]) => ({
            ...users[id],
            role
        })).sort(memberCompare(ownId))
    }
)

export const getSelectedChatMessages = createSelector(
    [getSelectedChat, getMessages, getUsers],
    (chat, messages, users) => {
        if(!chat) return [];

        return chat.messageIds
            .map(id => messages[id])
            .sort((a, b) => momentCompare(a.timestamp, b.timestamp))
            .map(message => {
                const author = users[message.authorId]

                return {
                    ...message,
                    authorName: author ? author.username || author.email : undefined
                }
            })
    }
)
