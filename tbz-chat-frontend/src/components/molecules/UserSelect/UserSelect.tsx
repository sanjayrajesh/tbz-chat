import {
    Box,
    Checkbox,
    Chip,
    ClickAwayListener,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuItem,
    Popper,
} from "@material-ui/core";
import { useField } from "formik";
import React, {
    KeyboardEvent,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import UserService from "../../../services/UserService";
import StyledTextField from "../../atoms/input/StyledTextField";
import { TextFieldProps } from "../../atoms/input/TextField";
import Paper from "../../atoms/Paper";
import {
    displayQueryResult,
    initState,
    selectUser,
    unselectUser,
    userSelectReducer,
} from "./userSelectReducer";

type UserSelectProps = Pick<
    TextFieldProps,
    "className" | "label" | "name" | "placeholder"
>;

const useStyle = makeStyles(
    (theme) => ({
        paper: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        popper: {
            zIndex: theme.zIndex.modal,
            width: "100%",
        },
    }),
    { name: "UserSelect" }
);

const UserSelect = (props: UserSelectProps) => {
    const { name, className, label, placeholder } = props;
    const classes = useStyle();
    const [field, meta, helpers] = useField(name);
    const [query, setQuery] = useState("");
    const [state, dispatch] = useReducer(
        userSelectReducer,
        field.value,
        initState
    );
    const inputRef = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [focused, setFocused] = useState(false);

    const handleChangeQuery = (e: any) => {
        setQuery(e.target.value);
    };

    const handleSearch = (key: string, e: KeyboardEvent) => {
        console.log(e);

        if (query.replace(/ /g, "").length > 0) {
            UserService.search(query).then((res) => {
                dispatch(displayQueryResult(res.data));
            });
        }
    };

    const selectHandler = (id: string, close?: boolean) => (e: any) => {
        inputRef.current?.focus();
        dispatch(selectUser(id));

        if(close) {
            handleBlur(e);
        } else {
            e.preventDefault();
        }
    };

    const unselectHandler = (id: string) => () => {
        inputRef.current?.focus();
        dispatch(unselectUser(id));
    };

    useEffect(() => {
        let isMounted = true;

        if (query.replace(/ /g, "").length > 0) {
            UserService.search(query).then((res) => {
                if (isMounted) {
                    dispatch(displayQueryResult(res.data));
                }
            });
        } else {
            dispatch(displayQueryResult([]));
        }

        return () => {
            isMounted = false;
        };
    }, [query]);

    const handleBlur = (e: any) => {
        setFocused(false);
        setQuery("");
        field.onBlur(e);
    };

    return (
        <ClickAwayListener onClickAway={handleBlur}>
            <Box width={1} className={className}>
                <KeyboardEventHandler
                    handleKeys={["enter"]}
                    onKeyEvent={handleSearch}
                >
                    <StyledTextField
                        onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setFocused(true);
                        }}
                        inputRef={inputRef}
                        placeholder={placeholder}
                        label={label}
                        value={query}
                        onChange={handleChangeQuery}
                        InputProps={{
                            startAdornment: Object.values(
                                state.selected
                            ).map((user) => (
                                <Chip
                                    key={user.id}
                                    label={user.username || user.email}
                                    onDelete={unselectHandler(user.id)}
                                />
                            )),
                        }}
                        focused={focused}
                        type="search"
                    />
                </KeyboardEventHandler>
                <Popper
                    open={Object.values(state.displayed).length > 0 && focused}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    className={classes.popper}
                    style={{
                        width: anchorEl?.clientWidth,
                    }}
                    disablePortal
                >
                    <Paper padding={0} className={classes.paper}>
                        {Object.values(state.displayed).map((user) => (
                            <MenuItem
                                dense
                                key={user.id}
                                button
                                onClick={selectHandler(user.id, true)}
                            >
                                <ListItemIcon>
                                    <Checkbox checked={user.selected} onClick={selectHandler(user.id)} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={user.username || user.email}
                                    secondary={
                                        user.username ? user.email : undefined
                                    }
                                />
                            </MenuItem>
                        ))}
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};

export default UserSelect;
