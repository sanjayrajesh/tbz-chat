import { Moment } from "moment";
import { createSelector } from "reselect";
import Entity from "../../models/Entity";
import Role from "../../models/Role";
import User from "../../models/User";
import { momentCompare } from "../../util/dateTime";
import Selector from "../../util/Selector";
import SelectorCreator from "../../util/SelectorCreator";
import { RootState } from "../rootReducer";

export interface LatestMessage {
    authorName?: string;
    timestamp: Moment;
    body: string;
}

export interface ChatPreview extends Entity {
    name: string;
    latestMessage?: LatestMessage;
}

const getLatestMessage: SelectorCreator<LatestMessage | undefined, string[]> = (
    messageIds
) => (state) => {
    if (messageIds.length === 0) {
        return undefined;
    } else {
        const message = messageIds
            .map((id) => state.messages.byId[id])
            .reduce((prev, current) => {
                if (current.timestamp.isAfter(prev.timestamp)) return current;
                else return prev;
            });

        const author = state.users.byId[message.authorId];

        return {
            ...message,
            authorName: author ? author.username || author.email : undefined,
        };
    }
};

const _getChatPreviews: Selector<ChatPreview[]> = (state) =>
    Object.values(state.chats.byId).map((chat) => ({
        ...chat,
        latestMessage: getLatestMessage(chat.messageIds)(state),
    }));

export const getChatPreviews = createSelector(
    [_getChatPreviews],
    (previews) => previews
);

const _getFilteredChatPreviews: SelectorCreator<ChatPreview[], string> = (
    filter
) => (state) => {
    if (filter.replace(" ", "").length === 0) {
        return _getChatPreviews(state);
    } else {
        return Object.values(state.chats.byId)
            .filter((chat) =>
                chat.name
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
            )
            .map((chat) => ({
                ...chat,
                latestMessage: getLatestMessage(chat.messageIds)(state),
            }))
            .sort((a, b) =>
                momentCompare(
                    a.latestMessage?.timestamp,
                    b.latestMessage?.timestamp
                )
            );
    }
};

export const getFilteredChatPreviews = createSelector(
    [_getFilteredChatPreviews],
    (previews) => previews
);

export const getSelectedChat = createSelector(
    [(state: RootState) => state.chats.selected, state => state.chats.byId],
    (selectedId, byId) => selectedId ? byId[selectedId] : undefined
);

export interface UserInChat extends User {
    role: Role;
}

const _getSelectedChatMembers: Selector<UserInChat[] | undefined> = (state) => {
    if (!state.chats.selected) return undefined;

    const chat = state.chats.byId[state.chats.selected];

    return Object.entries(chat.users).map(([userId, role]) => ({
        ...state.users.byId[userId],
        role
    }));
};

export const getSelectedChatMembers = createSelector(
    [_getSelectedChatMembers],
    (members) => members
);
