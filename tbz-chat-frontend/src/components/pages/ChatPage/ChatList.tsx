import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import clsx from 'clsx';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectChat } from '../../../redux/chat/chatActions';
import { getFilteredChatPreviews } from '../../../redux/chat/chatSelectors';
import { RootState } from '../../../redux/rootReducer';
import useLanguage from '../../../util/hooks/useLanguage';
import useThunkDispatch from '../../../util/hooks/useThunkDispatch';

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
    },
    chatItem: {
        borderBottom: `2px solid ${theme.palette.divider}`
    }
}));

const ChatList = (props: ChatListProps) => {

    const {className, filter} = props;
    const classes = useStyle();
    const chats = useSelector(getFilteredChatPreviews(filter));
    const getString = useLanguage();
    const dispatch = useThunkDispatch();
    const selected = useSelector((state: RootState) => state.chats.selected);

    const handleSelectChat = (id: string) => () => {
        dispatch(selectChat(id));
    } 

    return (
        <div className={clsx(className, classes.root)}>
                <List disablePadding className={classes.grow}>
                {chats.map(chat => (
                    <ListItem selected={chat.id === selected} button key={chat.id} onClick={handleSelectChat(chat.id)} className={classes.chatItem}>
                        <ListItemText primary={chat.name} secondary={chat.latestMessage ? chat.latestMessage.authorName + ": " + chat.latestMessage.body : getString("no.messages")} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default ChatList
