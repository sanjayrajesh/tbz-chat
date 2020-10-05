import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import clsx from 'clsx';
import React, { useEffect } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getFilteredChatPreviews } from '../../../redux/chat/chatSelectors';
import useLanguage from '../../../util/hooks/useLanguage';

type ChatListProps = {
    filter: string,
    className?: string
}

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    grow: {
        flexGrow: 1
    }
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyChats = [
    {
        id: "1",
        name: "Chat 1",
        latestMessage: {
            authorName: "John",
            timestamp: moment(),
            body: "Hi there!"
        }
    }
];

const ChatList = (props: ChatListProps) => {

    const {className, filter} = props;
    const classes = useStyle();
    const chats = useSelector(getFilteredChatPreviews(filter));
    const getString = useLanguage();

    useEffect(() => {
        console.log("chats", chats);
    }, [chats]);

    return (
        <div className={clsx(className, classes.root)}>
            <List className={classes.grow}>
                {chats.map(chat => (
                    <ListItem key={chat.id}>
                        <ListItemText primary={chat.name} secondary={chat.latestMessage ? chat.latestMessage.authorName + ": " + chat.latestMessage.body : getString("no.messages")} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default ChatList
