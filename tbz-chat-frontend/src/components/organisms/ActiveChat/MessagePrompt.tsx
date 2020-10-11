import { IconButton, makeStyles } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import { postMessage } from "../../../redux/message/messageActions";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import useLanguage from "../../../util/hooks/useLanguage";

const useStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        background: theme.palette.background.paper,
        padding: theme.spacing(2),
        display: "flex",
    },
    inputWrapper: {
        borderRadius: theme.spacing(3),
        padding: theme.spacing(1, 2),
        background: theme.palette.action.selected,
        flexGrow: 1,
        display: "flex",
        alignContent: "center",
    },
    input: {
        border: "none",
        outline: "none",
        width: "100%",
        background: "transparent",
        color: theme.palette.primary.contrastText,
        fontSize: theme.typography.h6.fontSize,
    },
}));

const MessagePrompt = () => {
    const classes = useStyle();
    const [input, setInput] = useState("");
    const dispatch = useThunkDispatch();
    const chatId = useSelector((state: RootState) => state.chats.selected);
    const getString = useLanguage();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (input.replace(" ", "").length > 0) {
            dispatch(postMessage(chatId!, { body: input })).finally(() => {
                setInput("");
            });
        }
    };

    return (
            <form className={classes.root} onSubmit={handleSubmit}>
                <div className={classes.inputWrapper}>
                    <input
                        className={classes.input}
                        onChange={handleChange}
                        value={input}        
                        placeholder={getString("type.a.message")}
                    />
                </div>
                <IconButton type="submit">
                    <SendIcon />
                </IconButton>
            </form>
    );
};

export default MessagePrompt;
