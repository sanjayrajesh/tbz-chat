import {
    Checkbox,
    Chip,
    ClickAwayListener,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Popper,
} from "@material-ui/core";
import { useField } from "formik";
import React, {
    ChangeEvent,
    FocusEvent,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import UserService from "../../../services/UserService";
import useRenderCount from "../../../util/hooks/useRenderCount";
import StyledTextField from "../../atoms/input/StyledTextField";
import { TextFieldProps } from "../../atoms/input/TextField";
import Paper from "../../atoms/Paper";
import {
    displayQueryResult,
    initState,
    selectUser,
    unselectLastUser,
    unselectUser,
    userSelectReducer,
} from "./userSelectReducer";

type UserSelectProps = Pick<TextFieldProps, "className" | "label" | "name">;

const useStyle = makeStyles(
    (theme) => ({
        paper: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        popper: {
            zIndex: theme.zIndex.modal,
        },
        listItem: {
            "&.MuiListItem-secondaryAction": {
                paddingLeft: theme.spacing(6),
                paddingRight: 0,
            },
        },
        listItemSecondaryAction: {
            left: theme.spacing(1),
            right: "auto",
        },
        listItemText: {},
        textField: {
            "& .MuiInputBase-root": {
                display: "flex",
                flexWrap: "wrap",
                padding: theme.spacing(1.5, "14px"),
                "& .MuiInputBase-input": {
                    flexGrow: 1,
                    minWidth: "min-content",
                    width: 0,
                    padding: "6.5px 0",
                },
            },
        },
        selectedUser: {
            paddingRight: theme.spacing(1),
        },
    }),
    { name: "UserSelect" }
);

const UserSelect = (props: UserSelectProps) => {

    useRenderCount("UserSelect");

    const { name, className, label } = props;
    const classes = useStyle();
    const [field,, helpers] = useField(name);
    const [state, dispatch] = useReducer(
        userSelectReducer,
        field.value,
        initState
    );
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const open = useMemo(() => Object.keys(state.displayed).length > 0, [
        state.displayed,
    ]);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [inputRef, setInputRef] = useState<HTMLDivElement | null>(null);

    const handleQueryChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
        },
        []
    );

    const handleClear = useCallback(() => {
        setQuery("");
        dispatch(displayQueryResult([]));
    }, []);

    const handleBackspace = useCallback(() => {
        if(!query) {
            dispatch(unselectLastUser());
        }
    }, [query]);

    const handleFocus = useCallback((e: any) => {
        setFocused(true);
    }, []);

    const handleClickAway = useCallback(
        (e: any) => {
            setFocused(false);
            handleClear();
            field.onBlur({
                ...e,
                target: {
                    ...e.target,
                    name,
                },
            });
        },
        // eslint-disable-next-line
        [name, handleClear]
    );

    const handleTextFieldBlur = useCallback(
        (e: FocusEvent) => {
            if (!open) {
                handleClickAway(e);
            }
        },
        [open, handleClickAway]
    );

    const getSelectHandler = useCallback(
        (id: string, clearOnSelect: boolean) => (e: any) => {
            dispatch(selectUser(id));

            if (clearOnSelect) {
                handleClear();
            }

            inputRef?.focus();
        },
        [handleClear, inputRef]
    );

    const getDeleteHandler = useCallback(
        (id: string) => (e: any) => {
            dispatch(unselectUser(id));

            inputRef?.focus();
        },
        [inputRef]
    );

    const displayedUsers = useMemo(
        () =>
            Object.values(state.displayed).map((user) => (
                <ListItem
                    className={classes.listItem}
                    key={user.id}
                    button
                    onClick={getSelectHandler(user.id, true)}
                >
                    <ListItemText
                        className={classes.listItemText}
                        primary={user.username || user.email}
                        secondary={user.username ? user.email : undefined}
                    />
                    <ListItemSecondaryAction
                        className={classes.listItemSecondaryAction}
                    >
                        <Checkbox
                            checked={user.selected}
                            onChange={getSelectHandler(user.id, false)}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            )),
        [state, classes, getSelectHandler]
    );

    const selectedUsers = useMemo(
        () =>
            Object.values(state.selected).map((user) => (
                <div key={user.id} className={classes.selectedUser}>
                    <Chip
                        label={user.username || user.email}
                        onDelete={getDeleteHandler(user.id)}
                    />
                </div>
            )),
        [state, getDeleteHandler, classes]
    );

    useEffect(() => {
        let isMounted = true;

        if (query.replace(/ /g, "").length > 0) {
            UserService.search(query).then((res) => {
                if (isMounted) {
                    dispatch(displayQueryResult(res.data));
                }
            });
        } else {
            handleClear();
        }

        return () => {
            isMounted = false;
        };
    }, [query, handleClear]);

    useEffect(() => {
        helpers.setValue(Object.values(state.selected));
        // eslint-disable-next-line
    }, [state.hash])

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <KeyboardEventHandler handleKeys={["esc"]} onKeyEvent={handleClear}>
                <div className={className}>
                    <KeyboardEventHandler
                        handleKeys={["backspace"]}
                        onKeyEvent={handleBackspace}
                    >
                        <StyledTextField
                            ref={setAnchorEl}
                            label={label}
                            inputRef={setInputRef}
                            value={query}
                            onChange={handleQueryChange}
                            focused={focused}
                            onFocus={handleFocus}
                            onBlur={handleTextFieldBlur}
                            InputProps={{
                                startAdornment: selectedUsers,
                            }}
                            className={classes.textField}
                        />
                    </KeyboardEventHandler>
                    <Popper
                        open={focused && open}
                        anchorEl={anchorEl}
                        style={{
                            width: anchorEl?.clientWidth,
                        }}
                        className={classes.popper}
                    >
                        <Paper className={classes.paper} padding={0}>
                            <List disablePadding dense>
                                {displayedUsers}
                            </List>
                        </Paper>
                    </Popper>
                </div>
            </KeyboardEventHandler>
        </ClickAwayListener>
    );
};

UserSelect.displayName = "UserSelect";

export default UserSelect;
