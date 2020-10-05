import { TextField } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import useLanguage from "../../../util/hooks/useLanguage";

type ChatSearchBarProps = {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
    className?: string;
};

const ChatSearchBar = (props: ChatSearchBarProps) => {
    const { filter, setFilter, className } = props;
    const getString = useLanguage();

    const handleChange = useCallback(
        (e: any) => {
            setFilter(e.target.value);
        },
        [setFilter]
    );

    return (
        <div className={className}>
            <TextField
                placeholder={getString("search.chats")}
                value={filter}
                onChange={handleChange}
                fullWidth
            />
        </div>
    );
};

export default ChatSearchBar;
