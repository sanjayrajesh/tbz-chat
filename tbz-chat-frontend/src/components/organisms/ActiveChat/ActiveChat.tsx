import { IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedChat } from "../../../redux/chat/chatSelectors";
import useLanguage from "../../../util/hooks/useLanguage";
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import ChatDetails from "./ChatDetails";

type ActiveChatProps = {
    className?: string;
    classes: {
        toolbar?: string;
        messages?: string;
    };
};

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    messages: {
        width: "100%",
        height: "inherit",
        transition: theme.transitions.create("width", {duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeInOut}),
    },
    messagesSmall: {
        width: "60%"
    },
    details: {
        width: 0,
        overflow: "hidden",
        transition: theme.transitions.create(["width"], {duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeInOut}),
        borderLeft: "none"
    },
    detailsOpen: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        width: "40%"
    },
    chatName: {
        flex: 1
    }
}));

const ActiveChat = (props: ActiveChatProps) => {
    const { className } = props;
    const chat = useSelector(getSelectedChat);
    const getString = useLanguage();
    const classes = useStyle();
    const [detailsOpen, setDetailsOpen] = useState(false);

    const toggleDetailsOpen = () => setDetailsOpen(open => !open);

    return (
        <div className={clsx(className, classes.root)}>
            <div className={clsx(classes.messages, {[classes.messagesSmall]: detailsOpen})}>
                <Toolbar className={props.classes.toolbar}>
                    {chat ? (
                        <>
                            <Typography variant="h5" className={classes.chatName}>
                                {chat.name}
                            </Typography>
                            <IconButton onClick={toggleDetailsOpen}>
                                {detailsOpen ? <RightIcon /> : <LeftIcon/>}
                            </IconButton>
                        </>
                    ) : (
                        <Typography variant="h5">
                            {getString("select.a.chat")}
                        </Typography>
                    )}
                </Toolbar>
            </div>
            <div className={clsx(classes.details, {[classes.detailsOpen]: detailsOpen})}>
                <ChatDetails classes={{toolbar: props.classes.toolbar}} />
            </div>
        </div>
    );
};

export default ActiveChat;
