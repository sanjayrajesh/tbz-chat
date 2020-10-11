import {
    makeStyles,
    Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import Chat from "../../../models/Chat";
import useLanguage from "../../../util/hooks/useLanguage";
import Paper from "../../atoms/Paper";
import ActiveChat from "../../organisms/ActiveChat/ActiveChat";
import Page from "../../Page";
import ChatList from "./ChatList";
import ChatSearchBar from "./ChatSearchBar";

const useStyle = makeStyles((theme) => ({
    paper: {
        height: "100%",
        width: "100%",
    },
    container: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
    },
    chats: {
        borderRight: `2px solid ${theme.palette.divider}`,
        flex: 1,
        height: "100%",
    },
    toolbar: {
        borderBottom: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(0, 2),
    },
    activeChat: {
        height: "100%",
        flex: 3,
    },
    activeChatMessages: {
        padding: theme.spacing(2),
    },
    chatList: {
        height: "100%",
        maxHeight: "calc(100% - 64px)"
    }
}));

const ChatPage = () => {
    const getString = useLanguage();
    const classes = useStyle();
    const [filter, setFilter] = useState("");

    return (
        <Page title={getString("chats")}>
            <Paper className={classes.paper} square padding={0}>
                <div className={classes.container}>
                    <div className={classes.chats}>
                        <Toolbar className={classes.toolbar}>
                            <ChatSearchBar
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </Toolbar>
                        <ChatList className={classes.chatList} filter={filter} />
                    </div>
                    <ActiveChat
                        className={classes.activeChat}
                        classes={{
                            toolbar: classes.toolbar,
                            messages: classes.activeChatMessages
                        }}
                    />
                </div>
            </Paper>
        </Page>
    );
};

export default ChatPage;
