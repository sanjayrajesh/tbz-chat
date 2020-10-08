import { List, makeStyles, Toolbar, Typography } from '@material-ui/core'
import clsx from 'clsx';
import React from 'react'
import { useSelector } from 'react-redux';
import { ADMINISTRATOR } from '../../../models/Role';
import { getSelectedChat, getSelectedChatMembers } from '../../../redux/chat/chatSelectors';
import useAuthState from '../../../util/hooks/useAuthState';
import useLanguage from '../../../util/hooks/useLanguage';
import ChatMember from './ChatMember';

type ChatDetailsProps = {
    classes: {
        toolbar?: string
    }
}

const useStyle = makeStyles(theme => ({
    toolbar: {
        width: "100%",
        overflowX: "hidden"
    }
}));

const ChatDetails = (props: ChatDetailsProps) => {

    const classes = useStyle();
    const getString = useLanguage();
    const members = useSelector(getSelectedChatMembers);
    const chat = useSelector(getSelectedChat);
    const {user} = useAuthState();

    return (
        <>
            <Toolbar className={clsx(props.classes.toolbar, classes.toolbar)}>
                <Typography variant="h5">
                    {getString("members")}
                </Typography>
            </Toolbar>
            <List disablePadding>
                {members!.map(member => (
                    <ChatMember actions={chat!.role === ADMINISTRATOR && user?.id !== member.id && member.role !== ADMINISTRATOR} member={member} />
                ))}
            </List>
        </>
    )
}

export default ChatDetails
