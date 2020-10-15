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
    useRef,
} from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import UserService from "../../../services/UserService";
import StyledTextField from "../../atoms/input/StyledTextField";
import { TextFieldProps } from "../../atoms/input/TextField";
import Paper from "../../atoms/Paper";
import { backspace, blur, changeQuery, clearQuery, clickAway, displayQueryResult, focus, selectUser, unselectUser } from "./actions";
import {
    initState,
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

    const { name, className, label } = props;
    const classes = useStyle();
    const [field,, helpers] = useField(name);
    const [state, dispatch] = useReducer(
        userSelectReducer,
        field.value,
        initState
    );
    const anchorEl = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleQueryChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeQuery(e.target.value));
        },
        []
    );

    const handleClear = useCallback(() => {
        dispatch(clearQuery());
    }, []);

    const handleBackspace = useCallback(() => {
        dispatch(backspace());
    }, []);

    const handleFocus = useCallback(() => {
        dispatch(focus());
    }, []);

    const handleClickAway = useCallback(
        (e: any) => {
            dispatch(clickAway());
            field.onBlur({
                ...e,
                target: {
                    ...e.target,
                    name,
                },
            });
        },
        // eslint-disable-next-line
        [name]
    );

    const handleTextFieldBlur = useCallback(
        (e: FocusEvent) => {
            if(!state.open) {
                handleClickAway(e);
            } else {
                dispatch(blur());
            }
        },
        [state.open, handleClickAway]
    );

    const getSelectHandler = useCallback(
        (id: string, clearOnSelect: boolean) => (e: any) => {
            dispatch(selectUser(id, clearOnSelect));

            inputRef.current?.focus();
        },
        []
    );

    const getDeleteHandler = useCallback(
        (id: string) => () => {
            dispatch(unselectUser(id));

            inputRef.current?.focus();
        },
        []
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
        [state.displayed, classes, getSelectHandler]
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
        [state.selected, getDeleteHandler, classes]
    );

    useEffect(() => {
        let isMounted = true;

        if (state.query.replace(/ /g, "").length > 0) {
            UserService.search(state.query).then((res) => {
                if (isMounted) {
                    dispatch(displayQueryResult(res.data));
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [state.query]);

    useEffect(() => {
        helpers.setValue(Object.values(state.selected));
        // eslint-disable-next-line
    }, [state.selected])

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <KeyboardEventHandler handleKeys={["esc"]} onKeyEvent={handleClear}>
                <div className={className}>
                    <KeyboardEventHandler
                        handleKeys={["backspace"]}
                        onKeyEvent={handleBackspace}
                    >
                        <StyledTextField
                            ref={anchorEl}
                            label={label}
                            inputRef={inputRef}
                            value={state.query}
                            onChange={handleQueryChange}
                            focused={state.focused}
                            onFocus={handleFocus}
                            onBlur={handleTextFieldBlur}
                            InputProps={{
                                startAdornment: selectedUsers,
                            }}
                            className={classes.textField}
                        />
                    </KeyboardEventHandler>
                    <Popper
                        open={state.focused && state.open}
                        anchorEl={anchorEl.current}
                        style={{
                            width: anchorEl.current?.clientWidth,
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
