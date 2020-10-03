import { AxiosResponse } from "axios";
import { UserResponse } from "../../services/UserService";
import AuthAction, { AUTH_FAILURE, AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "./authActionTypes";

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