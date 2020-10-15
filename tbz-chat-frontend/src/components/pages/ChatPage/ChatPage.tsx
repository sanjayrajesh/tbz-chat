import { Box, makeStyles, Toolbar } from "@material-ui/core";
import React, { useState } from "react";
import useLanguage from "../../../util/hooks/useLanguage";
import Paper from "../../atoms/Paper";
import ActiveChat from "../../organisms/ActiveChat/ActiveChat";
import Page from "../../Page";
import ChatList from "./ChatList";
import ChatSearchBar from "./ChatSearchBar";
import CreateChatButton from "./CreateChatButton";

const useStyle = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(0, 2),
    },
}), {name: "ChatPage"});

const ChatPage = () => {
    const getString = useLanguage();
    const classes = useStyle();
    const [filter, setFilter] = useState("");

    return (
        <Page title={getString("chats")}>
            <Box clone width={1} height={1}>
                <Paper square padding={0}>
                    <Box height={1} display="flex" flexDirection="row">
                        <Box
                            border={2}
                            borderLeft={0}
                            borderTop={0}
                            borderBottom={0}
                            borderColor="divider"
                            flex={1}
                            height={1}
                        >
                            <Toolbar className={classes.toolbar}>
                                <ChatSearchBar
                                    filter={filter}
                                    setFilter={setFilter}
                                />
                                <CreateChatButton />
                            </Toolbar>
                            <Box clone height={1} maxHeight="calc(100% - 64px)">
                                <ChatList filter={filter} />
                            </Box>
                        </Box>
                        <Box clone height={1} flex={3} >
                            <ActiveChat
                                classes={{
                                    toolbar: classes.toolbar,
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Page>
    );
};

export default ChatPage;
