import { Box, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOwnId } from "../../../redux/auth/authSelectors";
import { updateChats } from "../../../redux/chat/chatActions";
import ChatService from "../../../services/ChatService";
import useLanguage from "../../../util/hooks/useLanguage";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
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
    const ownId = useSelector(getOwnId);
    const dispatch = useThunkDispatch();

    useEffect(() => {
        let isMounted = true;
        const updateInterval = setInterval(() => {
            ChatService.getOwn().then(res => {
                if(isMounted) {
                    dispatch(updateChats(res.data));
                }
            })
        }, 3000)

        return () => {
            clearInterval(updateInterval);
            isMounted = false;
        }
    }, [ownId, dispatch]);

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
