import User from "../../models/User";
import EntityState, { createInitialState } from "../../util/EntityState";
import UserAction, { SET_USERS } from "./userActionTypes";

export type UserState = EntityState<User>

const initialState: UserState = createInitialState();

const userReducer = (state: UserState | undefined = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case SET_USERS:
            const userMap = action.payload.users;

            return {
                ...state,
                byId: userMap,
                allIds: Object.keys(userMap)
            }
        default:
            return state;
    }
}

export default userReducer;