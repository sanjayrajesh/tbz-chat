import { makeStyles, TextField } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import useLanguage from "../../../util/hooks/useLanguage";
import SearchIcon from "@material-ui/icons/Search";

type ChatSearchBarProps = {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
    className?: string;
};

const useStyle = makeStyles((theme) => ({
    textfield: {
        
    },
}));

const ChatSearchBar = (props: ChatSearchBarProps) => {
    const { filter, setFilter } = props;
    const getString = useLanguage();
    const classes = useStyle();

    const handleChange = useCallback(
        (e: any) => {
            setFilter(e.target.value);
        },
        [setFilter]
    );

    return (
        <TextField
            placeholder={getString("search.chats")}
            value={filter}
            onChange={handleChange}
            fullWidth
            InputProps={{
                endAdornment: <SearchIcon fontSize="small" />,
            }}
            className={classes.textfield}
            type="search"
        />
    );
};

export default ChatSearchBar;
