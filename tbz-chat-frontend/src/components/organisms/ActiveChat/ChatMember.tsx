import {
    Box,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { ADMINISTRATOR } from "../../../models/Role";
import {
    makeAdministrator,
    removeFromChat,
} from "../../../redux/chat/chatActions";
import { getSelectedChat, UserInChat } from "../../../redux/chat/chatSelectors";
import useLanguage from "../../../util/hooks/useLanguage";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";

type ChatMemberProps = {
    member: UserInChat;
    actions?: boolean;
};

type ContentProps = {
    member: UserInChat;
};

const Content = (props: ContentProps) => {
    const { member } = props;
    const getString = useLanguage();

    return (
        <Fragment>
            <Box flexGrow={1}>
                <Typography>{member.username || member.email}</Typography>
            </Box>
            {member.role === ADMINISTRATOR ? (
                <Typography color="textSecondary">
                    {getString("administrator")}
                </Typography>
            ) : null}
        </Fragment>
    );
};

const Simple = (props: ContentProps) => (
    <Box clone display="flex">
        <ListItem>
            <Content {...props} />
        </ListItem>
    </Box>
);

const Actions = (props: ContentProps) => {
    const { member } = props;
    const getString = useLanguage();
    const [anchorEl, setAnchorEl] = useState(null);
    const chat = useSelector(getSelectedChat);
    const dispatch = useThunkDispatch();

    const handleClick = (e: any) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleMakeAdministrator = () => {
        dispatch(makeAdministrator(member.id, chat!.id)).finally(handleClose);
    };
    const handleRemoveFromChat = () => {
        dispatch(removeFromChat(member.id, chat!.id)).finally(handleClose);
    };

    return (
        <Fragment>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                }}
            >
                <MenuItem button>
                    <ListItemText
                        primary={getString("make.administrator")}
                        onClick={handleMakeAdministrator}
                    />
                </MenuItem>
                <MenuItem>
                    <ListItemText
                        primary={getString("remove.from.chat")}
                        onClick={handleRemoveFromChat}
                    />
                </MenuItem>
            </Menu>
            <Box clone display="flex">
                <ListItem
                    selected={Boolean(anchorEl)}
                    button
                    onClick={handleClick}
                >
                    <Content member={member} />
                </ListItem>
            </Box>
        </Fragment>
    );
};

const ChatMember = (props: ChatMemberProps) => {
    const { member, actions } = props;

    if (actions) return <Actions member={member} />;
    else return <Simple member={member} />;
};

export default ChatMember;
