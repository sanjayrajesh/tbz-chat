import { RootState } from "../rootReducer";

export const getOwnId = (state: RootState) => {
    if(state.auth.user) {
        return state.auth.user.id;
    } else {
        throw new Error("Not authenticated");
    }
}