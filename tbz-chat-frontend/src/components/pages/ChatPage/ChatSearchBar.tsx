import React, { Dispatch, SetStateAction, useCallback } from "react";
import useLanguage from "../../../util/hooks/useLanguage";
import SearchField from "../../atoms/input/SearchField";

type ChatSearchBarProps = {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
    className?: string;
};

const ChatSearchBar = (props: ChatSearchBarProps) => {
    const { filter, setFilter } = props;
    const getString = useLanguage();

    const handleChange = useCallback(
        (e: any) => {
            setFilter(e.target.value);
        },
        [setFilter]
    );

    return (
        <SearchField
            placeholder={getString("search.chats")}
            value={filter}
            onChange={handleChange}
        />
    );
};

export default ChatSearchBar;
