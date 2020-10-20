import { AxiosResponse } from "axios";
import { ThunkAction } from "redux-thunk";
import User from "../../models/User";
import UserService, { UserResponse } from "../../services/UserService";
import { RootAction, RootState } from "../rootReducer";
import AuthAction, { AUTH_FAILURE, AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, UPDATE_AUTHENTICATED } from "./authActionTypes";

export const authSuccess = (response: AxiosResponse<UserResponse>): AuthAction => ({
    type: AUTH_SUCCESS,
    payload: {
        response
    }
})

export const authFailure = (): AuthAction => ({
    type: AUTH_FAILURE
})

export const loginSuccess = (response: AxiosResponse<UserResponse>): AuthAction => ({
    type: LOGIN_SUCCESS,
    payload: {
        response
    }
})

export const loginFailure = (): AuthAction => ({
    type: LOGIN_FAILURE
})

export const logout = (): AuthAction => ({
    type: LOGOUT
})

const _updateAuthenticated = (user: User): AuthAction => ({
    type: UPDATE_AUTHENTICATED,
    payload: {
        user
    }
})

export const updateAuthenticated: (user: User, beforeDispatch?: () => void) => ThunkAction<Promise<void>, RootState, void, RootAction> = (user, beforeDispatch) => dispatch => UserService.updateOwn(user).then(res => {
    if(beforeDispatch) {
        beforeDispatch();
    }
    dispatch(_updateAuthenticated(res.data));
})