import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import useLanguage from "../../../util/hooks/useLanguage";
import SearchField from "../../atoms/input/SearchField";

type ChatSearchBarProps = {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
    className?: string;
};

const useStyle = makeStyles(theme => ({
    input: {
        backgroundColor: "transparent",
        "& .MuiInputBase-root:before, .MuiInputBase-root:after": {
            display: "none"
        }
    },
    root: {
        backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[700] : theme.palette.common.white,
        padding: theme.spacing(0.5, 2),
        borderRadius: theme.spacing(2.5)
    }
}), {name: "ChatSearchBar"});

const ChatSearchBar = (props: ChatSearchBarProps) => {
    const { filter, setFilter, className } = props;
    const getString = useLanguage();
    const classes = useStyle();

    const handleChange = useCallback(
        (e: any) => {
            setFilter(e.target.value);
        },
        [setFilter]
    );

    return (
        <div className={clsx(classes.root, className)}>
            <SearchField
            placeholder={getString("search.chats")}
            value={filter}
            onChange={handleChange}
            className={classes.input}
        />
        </div>
    );
};

export default ChatSearchBar;
