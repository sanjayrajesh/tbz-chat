import User from "../../models/User";
import EntityMap from "../../util/EntityMap";

export const SET_USERS = 'SET_USERS'

type SetUsers = {
    type: typeof SET_USERS,
    payload: {
        users: EntityMap<User>
    }
}

type UserAction = SetUsers;

export default UserAction;