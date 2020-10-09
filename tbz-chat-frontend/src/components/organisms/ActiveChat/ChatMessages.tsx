import { makeStyles, TextField, Typography } from "@material-ui/core";
import clsx from "clsx";
import { Moment } from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { getSelectedChatMessages } from "../../../redux/message/messageSelectors";
import useAuthState from "../../../util/hooks/useAuthState";
import useLanguage from "../../../util/hooks/useLanguage";
import Center from "../../atoms/Center";
import Message from "./Message";

type ChatMessagesProps = {
    className?: string;
};

type MessageProps = {
    message: {
        timestamp: Moment;
        body: string;
        authorName: string;
    };
};

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    messages: {
        flexGrow: 1,
        padding: theme.spacing(2, 6)
    },
}));

const ChatMessages = (props: ChatMessagesProps) => {
    const { className } = props;
    const messages = useSelector(getSelectedChatMessages);
    const classes = useStyle();
    const getString = useLanguage();

    if (!messages)
        return (
            <Center>
                <Typography>{getString("no.messages")}</Typography>
            </Center>
        );
    else
        return (
            <div className={clsx(classes.root, className)}>
                <div className={classes.messages}>
                    {messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>
                <TextField fullWidth placeholder={getString("enter.a.message")} />
            </div>
        );
};

export default ChatMessages;
