import {
    Box,
    List,
    ListItem,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectChat } from "../../../redux/chat/chatActions";
import { getChatPreviews } from "../../../redux/chat/chatSelectors";
import { RootState } from "../../../redux/rootReducer";
import useLanguage from "../../../util/hooks/useLanguage";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";

type ChatListProps = {
    filter: string;
    className?: string;
};

const useStyle = makeStyles(theme => ({
    chat: {
        borderBottom: `2px solid ${theme.palette.divider}`,
    }
}), {name: "ChatList"});

const ChatList = (props: ChatListProps) => {
    const { className, filter } = props;
    const chats = useSelector((state: RootState) => getChatPreviews(state, filter));
    const getString = useLanguage();
    const dispatch = useThunkDispatch();
    const selected = useSelector((state: RootState) => state.chats.selected);
    const classes = useStyle();

    const handleSelectChat = (id: string) => () => {
        dispatch(selectChat(id));
    };

    return (
        <Box clone className={className} overflow="auto">
            <List disablePadding>
                {chats.map((chat) => (
                        <ListItem
                            key={chat.id}
                            selected={chat.id === selected}
                            button
                            onClick={handleSelectChat(chat.id)}
                            className={classes.chat}
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
                ))}
            </List>
        </Box>
    );
};

export default ChatList;
