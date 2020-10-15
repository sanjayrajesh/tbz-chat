import { createSelector } from "reselect";
import { momentCompare } from "../../util/dateTime";
import { RootState } from "../rootReducer";

const chatSelector = (state: RootState) => state.chats.byId

const messageSelector = (state: RootState) => state.messages.byId

const selectedChatIdSelector = (state: RootState) => state.chats.selected

const userSelector = (state: RootState) => state.users.byId

export const getSelectedChatMessages = createSelector(
    [chatSelector, messageSelector, selectedChatIdSelector, userSelector],
    (chats, messages, selectedId, users) => {
        if(!selectedId) return undefined;

        const selectedChat = chats[selectedId];

        return selectedChat.messageIds
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