import User from "../../../models/User";

export const DISPLAY_QUERY_RESULT = "DISPLAY_QUERY_RESULT";
export const SELECT_USER = "SELECT_USER";
export const UNSELECT_USER = "UNSELECT_USER";
export const FOCUS = "FOCUS";
export const BLUR = "BLUR";
export const CLICK_AWAY = "CLICK_AWAY";
export const CHANGE_QUERY = "CHANGE_QUERY";
export const CLEAR_QUERY = "CLEAR_QUERY";
export const BACKSPACE = "BACKSPACE";

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
        close: boolean;
    };
};

type UnselectUser = {
    type: typeof UNSELECT_USER;
    payload: {
        id: string;
    };
};

type Focus = {
    type: typeof FOCUS;
}

type Blur = {
    type: typeof BLUR;
}

type ClickAway = {
    type: typeof CLICK_AWAY;
}

type ChangeQuery = {
    type: typeof CHANGE_QUERY;
    payload: {
        query: string;
    }
}

type ClearQuery = {
    type: typeof CLEAR_QUERY;
}

type Backspace = {
    type: typeof BACKSPACE;
}

export type UserSelectAction = DisplayQueryResult | SelectUser | UnselectUser | Focus | Blur | ClickAway | ChangeQuery | ClearQuery | Backspace;