import {
    Box,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectChat } from "../../../redux/chat/chatActions";
import { getFilteredChatPreviews } from "../../../redux/chat/chatSelectors";
import { RootState } from "../../../redux/rootReducer";
import useLanguage from "../../../util/hooks/useLanguage";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";

type ChatListProps = {
    filter: string;
    className?: string;
};

const ChatList = (props: ChatListProps) => {
    const { className, filter } = props;
    const chats = useSelector(getFilteredChatPreviews(filter));
    const getString = useLanguage();
    const dispatch = useThunkDispatch();
    const selected = useSelector((state: RootState) => state.chats.selected);

    const handleSelectChat = (id: string) => () => {
        dispatch(selectChat(id));
    };

    return (
        <Box clone className={className} overflow="auto">
            <List disablePadding>
                {chats.map((chat) => (
                    <Box clone border={2} borderTop={0} borderLeft={0} borderRight={0} borderColor="divider">
                        <ListItem
                            selected={chat.id === selected}
                            button
                            key={chat.id}
                            onClick={handleSelectChat(chat.id)}
                        >
                            <ListItemText
                                primary={chat.name}
                                secondary={
                                    chat.latestMessage
                                        ? chat.latestMessage.authorName +
                                          ": " +
                                          chat.latestMessage.body
                                        : getString("no.messages")
                                }
                            />
                        </ListItem>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default ChatList;
