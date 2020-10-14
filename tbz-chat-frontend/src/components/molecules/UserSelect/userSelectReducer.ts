import User from "../../../models/User";
import EntityMap from "../../../util/EntityMap";

const DISPLAY_QUERY_RESULT = "DISPLAY_QUERY_RESULT";
const SELECT_USER = "SELECT_USER";
const UNSELECT_USER = "UNSELECT_USER";

type DisplayQueryResult = {
    type: typeof DISPLAY_QUERY_RESULT;
    payload: {
        users: User[];
    };
};

type SelectUser = {
    type: typeof SELECT_USER;
    payload: {
        id: string;
    };
};

type UnselectUser = {
    type: typeof UNSELECT_USER;
    payload: {
        id: string;
    };
};

export type UserSelectAction = DisplayQueryResult | SelectUser | UnselectUser;

export const displayQueryResult = (users: User[]): UserSelectAction => ({
    type: DISPLAY_QUERY_RESULT,
    payload: {
        users,
    },
});

export const selectUser = (id: string): UserSelectAction => ({
    type: SELECT_USER,
    payload: {
        id,
    },
});

export const unselectUser = (id: string): UserSelectAction => ({
    type: UNSELECT_USER,
    payload: {
        id,
    },
});

export type UserSelectState = {
    displayed: {
        [id: string]: User & {
            selected: boolean;
        };
    };
    selected: {
        [id: string]: User;
    };
};

export const initState = (users: User[]): UserSelectState => {
    let selected: EntityMap<User> = {};

    users.forEach((user) => (selected[user.id] = user));

    return {
        displayed: {},
        selected,
    };
};

const _displayQueryResult = (
    state: UserSelectState,
    users: User[]
): UserSelectState => {
    let displayed: EntityMap<User & {selected: boolean}> = {}

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
    };
};

const _selectUser = (state: UserSelectState, id: string): UserSelectState => {
    let selected = state.selected;
    let displayed = state.displayed;

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
        selected,
        displayed,
    };
};

const _unselectUser = (state: UserSelectState, id: string): UserSelectState => {
    let selected = state.selected;
    let displayed = state.displayed;

    delete selected[id];
    if (displayed[id]) {
        displayed[id].selected = false;
    }

    return {
        selected,
        displayed,
    };
};

export const userSelectReducer = (
    state: UserSelectState,
    action: UserSelectAction
): UserSelectState => {
    switch (action.type) {
        case DISPLAY_QUERY_RESULT:
            return _displayQueryResult(state, action.payload.users);
        case SELECT_USER:
            return _selectUser(state, action.payload.id);
        case UNSELECT_USER:
            return _unselectUser(state, action.payload.id);
        default:
            return state;
    }
};
