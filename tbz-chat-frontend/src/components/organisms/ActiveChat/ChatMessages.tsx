import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { getSelectedChatMessages } from "../../../redux/message/messageSelectors";
import useLanguage from "../../../util/hooks/useLanguage";
import Center from "../../atoms/Center";
import Message from "./Message";
import MessagePrompt from "./MessagePrompt";

type ChatMessagesProps = {
    className?: string;
};

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    messages: {
        padding: theme.spacing(2, 6),
        width: "100%",
        flexGrow: 1,
        maxHeight: "calc(100% - 80px)",
        overflow: "auto"
    },
    messagePrompt: {
        height: "80px"
    }
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
                <MessagePrompt className={classes.messagePrompt} />
            </div>
        );
};

export default ChatMessages;
