import { List, Toolbar, Typography } from '@material-ui/core'
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

const ChatDetails = (props: ChatDetailsProps) => {
    const getString = useLanguage();
    const members = useSelector(getSelectedChatMembers);
    const chat = useSelector(getSelectedChat);
    const {user} = useAuthState();

    return (
        <>
            <Toolbar className={props.classes.toolbar}>
                <Typography variant="h5">
                    {getString("members")}
                </Typography>
            </Toolbar>
            <List disablePadding>
                {members!.map(member => (
                    <ChatMember key={member.id} actions={chat!.role === ADMINISTRATOR && user?.id !== member.id && member.role !== ADMINISTRATOR} member={member} />
                ))}
            </List>
        </>
    )
}

export default ChatDetails
