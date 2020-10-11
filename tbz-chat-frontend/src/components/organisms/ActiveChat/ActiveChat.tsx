import { Box, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedChat } from "../../../redux/chat/chatSelectors";
import useLanguage from "../../../util/hooks/useLanguage";
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import ChatDetails from "./ChatDetails";
import ChatMessages from "./ChatMessages";
import { setPageTitle } from "../../Page";

type ActiveChatProps = {
    className?: string;
    classes: {
        toolbar?: string;
        messages?: string;
    };
};

const useStyle = makeStyles((theme) => ({
    messagesContainer: {
        width: "100%",
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
}));

const ActiveChat = (props: ActiveChatProps) => {
    const { className } = props;
    const chat = useSelector(getSelectedChat);
    const getString = useLanguage();
    const classes = useStyle();
    const [detailsOpen, setDetailsOpen] = useState(false);

    const toggleDetailsOpen = () => setDetailsOpen(open => !open);

    useEffect(() => {
        if(chat) {
            setPageTitle(chat.name);
        }
    }, [chat]);

    return (
        <Box className={className} display="flex">
            <div className={clsx(classes.messagesContainer, {[classes.messagesSmall]: detailsOpen})}>
                <Toolbar className={props.classes.toolbar}>
                    {chat ? (
                        <>
                            <Box flex={1}>
                            <Typography variant="h5">
                                {chat.name}
                            </Typography>
                            </Box>
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
                <Box clone height="calc(100% - 64px)" bgcolor="background.default">
                <ChatMessages />
                </Box>
            </div>
            <div className={clsx(classes.details, {[classes.detailsOpen]: detailsOpen})}>
                <ChatDetails classes={{toolbar: props.classes.toolbar}} />
            </div>
        </Box>
    );
};

export default ActiveChat;
