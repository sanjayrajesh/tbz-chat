import {
    Box,
    Divider,
    Grid,
    List,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ADMINISTRATOR } from "../../../models/Role";
import { leaveChat } from "../../../redux/chat/chatActions";
import {
    getSelectedChat,
    getSelectedChatMembers,
} from "../../../redux/chat/chatSelectors";
import useAuthState from "../../../util/hooks/useAuthState";
import useLanguage from "../../../util/hooks/useLanguage";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import DangerAction from "../../molecules/DangerAction";
import AddMembersButton from "./AddMembersButton";
import ChatMember from "./ChatMember";

type ChatDetailsProps = {
    classes: {
        toolbar?: string;
    };
};

const useStyle = makeStyles(
    (theme) => ({
        dangerButton: {
            color: theme.palette.error.main,
            textTransform: "none",
            width: "100%",
            padding: theme.spacing(1, 2),
            fontSize: theme.typography.h6.fontSize,
            borderRadius: 0,
            "& .MuiButton-label": {
                justifyContent: "flex-start",
            },
        },
    }),
    { name: "ChatDetails" }
);

const ChatDetails = (props: ChatDetailsProps) => {
    const getString = useLanguage();
    const members = useSelector(getSelectedChatMembers);
    const chat = useSelector(getSelectedChat);
    const { user } = useAuthState();
    const classes = useStyle();
    const dispatch = useThunkDispatch();

    const handleLeaveChat = () => {
        dispatch(leaveChat(chat!.id));
    };

    return (
        <>
            <Toolbar className={props.classes.toolbar}>
                <Typography variant="h6">{getString("details")}</Typography>
            </Toolbar>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Box py={1} px={2} display="flex" m={-1} alignItems="center">
                        <Box p={1} flexGrow={1}>
                            <Typography variant="h6">
                                {getString("members")}
                            </Typography>
                        </Box>
                        <Box p={1}>
                            <AddMembersButton />
                        </Box>
                    </Box>
                    <Divider />
                    <List disablePadding>
                        {members!.map((member) => (
                            <ChatMember
                                key={member.id}
                                actions={
                                    chat!.role === ADMINISTRATOR &&
                                    user?.id !== member.id &&
                                    member.role !== ADMINISTRATOR
                                }
                                member={member}
                            />
                        ))}
                    </List>
                </Grid>
                <Grid item>
                    <DangerAction
                        action={handleLeaveChat}
                        confirmationBody={getString(
                            "confirm.leave.chat",
                            chat!.name
                        )}
                        className={classes.dangerButton}
                    >
                        {getString("leave.chat")}
                    </DangerAction>
                </Grid>
            </Grid>
        </>
    );
};

export default ChatDetails;
