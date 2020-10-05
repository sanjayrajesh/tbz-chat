import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import clsx from 'clsx';
import React, { useEffect } from 'react'
import moment from 'moment';

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

    const {className} = props;
    const classes = useStyle();
    const chats = dummyChats;

    useEffect(() => {
        console.log("chats", chats);
    }, [chats]);

    return (
        <div className={clsx(className, classes.root)}>
            <List className={classes.grow}>
                {chats.map(chat => (
                    <ListItem key={chat.id}>
                        <ListItemText primary={chat.name} secondary={chat.latestMessage && chat.latestMessage.authorName + ": " + chat.latestMessage.body} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default ChatList
