import User from "../../../models/User";
import EntityMap from "../../../util/EntityMap";
import {
    BACKSPACE,
    BLUR,
    CHANGE_QUERY,
    CLEAR_QUERY,
    CLICK_AWAY,
    DISPLAY_QUERY_RESULT,
    FOCUS,
    SELECT_USER,
    UNSELECT_USER,
    UserSelectAction,
} from "./actionTypes";

export type UserSelectState = {
    displayed: {
        [id: string]: User & {
            selected: boolean;
        };
    };
    selected: {
        [id: string]: User;
    };
    open: boolean;
    focused: boolean;
    query: string;
};

export const initState = (users: User[]): UserSelectState => {
    let selected: EntityMap<User> = {};

    users.forEach((user) => (selected[user.id] = user));

    return {
        displayed: {},
        selected,
        open: false,
        focused: false,
        query: "",
    };
};

const displayQueryResult = (
    state: UserSelectState,
    users: User[]
): UserSelectState => {
    let displayed: EntityMap<User & { selected: boolean }> = {};

    users.forEach((user) => {
        if (state.selected[user.id]) {
            displayed[user.id] = {
                ...user,
                selected: true,
            };
        } else {
            displayed[user.id] = {
                ...user,
                selected: false,
            };
        }
    });

    return {
        ...state,
        displayed,
        open: users.length > 0,
    };
};

const selectUser = (
    state: UserSelectState,
    id: string,
    close: boolean
): UserSelectState => {
    let selected = { ...state.selected };
    let displayed = { ...state.displayed };

    if (selected[id]) {
        delete selected[id];
        if (displayed[id]) {
            displayed[id].selected = false;
        }
    } else {
        selected[id] = state.displayed[id];
        displayed[id].selected = true;
    }

    return {
        ...state,
        open: !close,
        query: close ? "" : state.query,
        selected,
        displayed,
    };
};

const unselectUser = (state: UserSelectState, id: string): UserSelectState => {
    let selected = { ...state.selected };
    let displayed = { ...state.displayed };

    delete selected[id];
    if (displayed[id]) {
        displayed[id].selected = false;
    }

    return {
        ...state,
        focused: true,
        selected,
        displayed,
    };
};

const focus = (state: UserSelectState): UserSelectState => {
    return {
        ...state,
        focused: true,
    };
};

const blur = (state: UserSelectState): UserSelectState => {
    if (!state.open) {
        return clickAway(state);
    } else {
        return state;
    }
};

const clickAway = (state: UserSelectState): UserSelectState => {
    if(state.focused) {
        return {
            ...state,
            focused: false,
            open: false,
            query: "",
            displayed: {},
        };
    } else return state;
};

const changeQuery = (
    state: UserSelectState,
    query: string
): UserSelectState => {
    return {
        ...state,
        query,
        displayed: query.replace(/ /g, "").length > 0 ? state.displayed : {},
    };
};

const clearQuery = (state: UserSelectState): UserSelectState => {
    if (state.query.replace(/ /g, "").length > 0) {
        return changeQuery(state, "");
    } else {
        return {
            ...state,
            query: "",
            displayed: {},
            open: false,
        };
    }
};

const backspace = (state: UserSelectState): UserSelectState => {
    if (!state.query) {
        const keys = Object.keys(state.selected);

        if (keys.length > 0) {
            return unselectUser(state, keys[keys.length - 1]);
        }
    }

    return state;
};

export const userSelectReducer = (
    state: UserSelectState,
    action: UserSelectAction
): UserSelectState => {
    switch (action.type) {
        case DISPLAY_QUERY_RESULT:
            return displayQueryResult(state, action.payload.users);
        case SELECT_USER:
            return selectUser(state, action.payload.id, action.payload.close);
        case UNSELECT_USER:
            return unselectUser(state, action.payload.id);
        case FOCUS:
            return focus(state);
        case BLUR:
            return blur(state);
        case CLICK_AWAY:
            return clickAway(state);
        case CHANGE_QUERY:
            return changeQuery(state, action.payload.query);
        case CLEAR_QUERY:
            return clearQuery(state);
        case BACKSPACE:
            return backspace(state);
        default:
            return state;
    }
};
