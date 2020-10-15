import User from "../../../models/User";
import { BACKSPACE, BLUR, CHANGE_QUERY, CLEAR_QUERY, CLICK_AWAY, DISPLAY_QUERY_RESULT, FOCUS, SELECT_USER, UNSELECT_USER, UserSelectAction } from "./actionTypes";

export const displayQueryResult = (users: User[]): UserSelectAction => ({
    type: DISPLAY_QUERY_RESULT,
    payload: {
        users,
    },
});

export const selectUser = (id: string, close: boolean): UserSelectAction => ({
    type: SELECT_USER,
    payload: {
        id,
        close
    },
});

export const unselectUser = (id: string): UserSelectAction => ({
    type: UNSELECT_USER,
    payload: {
        id,
    },
});

export const focus = (): UserSelectAction => ({
    type: FOCUS
})

export const blur = (): UserSelectAction => ({
    type: BLUR
})

export const clickAway = (): UserSelectAction => ({
    type: CLICK_AWAY
})

export const changeQuery = (query: string): UserSelectAction => ({
    type: CHANGE_QUERY,
    payload: {
        query
    }
})

export const clearQuery = (): UserSelectAction => ({
    type: CLEAR_QUERY
})

export const backspace = (): UserSelectAction => ({
    type: BACKSPACE
})