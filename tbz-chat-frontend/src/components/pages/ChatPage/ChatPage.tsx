import { Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Chat from "../../../models/Chat";
import useLanguage from "../../../util/hooks/useLanguage";
import Paper from "../../atoms/Paper";
import Page from "../../Page";
import ChatList from "./ChatList";
import ChatSearchBar from "./ChatSearchBar";

export const dummyChats: Chat[] = [
    {
        id: "1",
        messageIds: [],
        role: "ADMINISTRATOR",
        name: "Chat 1",
        users: [],
    },
    {
        id: "2",
        messageIds: [],
        role: "MEMBER",
        name: "Chat 22222222222",
        users: [],
    },
];

const useStyle = makeStyles((theme) => ({
    paper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    chatList: {
        height: "100%",
    },
    activeChat: {
        background: "lightgreen",
    },
    toolbarElement: {
        margin: theme.spacing(0, 2),
    },
    grow: {
        flexGrow: 1
    }
}));

const ChatPage = () => {
    const getString = useLanguage();
    const classes = useStyle();

    const [filter, setFilter] = useState("");

    return (
        <Page title={getString("chats")}>
            <Paper className={classes.paper} square padding={0}>
                <Toolbar disableGutters>
                    <Grid container direction="row" alignItems="baseline">
                        <Grid item sm={4}>
                            <ChatSearchBar
                                filter={filter}
                                setFilter={setFilter}
                                className={classes.toolbarElement}
                            />
                        </Grid>
                        <Grid item sm>
                            <div className={classes.toolbarElement}>
                                <Typography>Active Chat Toolbar</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Grid container direction="row" className={classes.grow}>
                    <Grid item sm={4}>
                        <ChatList
                            filter={filter}
                            className={classes.chatList}
                        />
                    </Grid>
                    <Grid item sm>
                        Active Chat Messages
                    </Grid>
                </Grid>
            </Paper>
        </Page>
    );
};

export default ChatPage;
