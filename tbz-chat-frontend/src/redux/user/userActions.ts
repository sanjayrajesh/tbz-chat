import User from "../../models/User";
import EntityMap from "../../util/EntityMap";
import UserAction, { SET_USERS } from "./userActionTypes";

export const setUsers = (users: EntityMap<User>): UserAction => ({
    type: SET_USERS,
    payload: {
        users
    }
})