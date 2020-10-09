import { IconButton, makeStyles } from "@material-ui/core";
import React, { createRef, FormEvent, useEffect, useRef, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import { postMessage } from "../../../redux/message/messageActions";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import KeyboardEventHandler from "react-keyboard-event-handler";

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
        display: "inline"
    },
}));

const MessagePrompt = () => {
    const classes = useStyle();
    const [input, setInput] = useState("");
    const dispatch = useThunkDispatch();
    const chatId = useSelector((state: RootState) => state.chats.selected);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: FormEvent<HTMLDivElement>) => {
        e.persist();
        console.log(e);

        console.log(inputRef.current);

        if(e.type === 'input') {
            const nativeEvent = e.nativeEvent as InputEvent

            let newInput = input;

            if(nativeEvent.inputType === 'insertText' && nativeEvent.data !== null) {
                newInput = input + nativeEvent.data;
            } else if (nativeEvent.inputType === 'deleteContentBackward') {
                newInput = input.substring(0, input.length - 1);
            }

            inputRef.current!.innerHTML = newInput.split("\n").map(line => `<p>${line}</p>`).join("");
            setInput(newInput);
        }
    };

    const addNewline = () => {
        setInput(input => input + "\n");
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (input.replace(" ", "").length > 0) {
            dispatch(postMessage(chatId!, { body: input })).finally(() => {
                setInput("");
                inputRef.current!.innerText = "";
            });
        }
    };

    useEffect(() => {
        console.log("input", input);
    }, [input]);

    return (
        <KeyboardEventHandler
            handleKeys={["shift+enter"]}
            onKeyEvent={addNewline}
        >
            <form className={classes.root} onSubmit={handleSubmit}>
                <div className={classes.inputWrapper}>
                    <div
                        ref={inputRef}
                        className={classes.input}
                        onChange={handleChange}
                        contentEditable={true}
                        onInput={handleChange}
                        
                    />
                </div>
                <IconButton onClick={handleSubmit}>
                    <SendIcon />
                </IconButton>
            </form>
        </KeyboardEventHandler>
    );
};

export default MessagePrompt;
