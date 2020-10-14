import User from "../../../models/User";
import EntityMap from "../../../util/EntityMap";
import {v4 as uuid} from 'uuid';

const DISPLAY_QUERY_RESULT = "DISPLAY_QUERY_RESULT";
const SELECT_USER = "SELECT_USER";
const UNSELECT_USER = "UNSELECT_USER";
const UNSELECT_LAST_USER = 'UNSELECT_LAST_USER';

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

type UnselectLastUser = {
    type: typeof UNSELECT_LAST_USER;
}

export type UserSelectAction = DisplayQueryResult | SelectUser | UnselectUser | UnselectLastUser;

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

export const unselectLastUser = (): UserSelectAction => ({
    type: UNSELECT_LAST_USER
})

export type UserSelectState = {
    displayed: {
        [id: string]: User & {
            selected: boolean;
        };
    };
    selected: {
        [id: string]: User;
    };
    hash: string;
};

export const initState = (users: User[]): UserSelectState => {
    let selected: EntityMap<User> = {};

    users.forEach((user) => (selected[user.id] = user));

    return {
        displayed: {},
        selected,
        hash: uuid()
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
        hash: uuid(),
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
        hash: uuid(),
        selected,
        displayed,
    };
};

const _unselectLastUser = (state: UserSelectState): UserSelectState => {
    const keys = Object.keys(state.selected);

    if(keys.length > 0) {
        return _unselectUser(state, keys[keys.length - 1]);
    }

    return state;
}

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
        case UNSELECT_LAST_USER:
            return _unselectLastUser(state);
        default:
            return state;
    }
};
