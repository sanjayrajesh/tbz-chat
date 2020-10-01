import { AxiosResponse } from "axios";
import { UserResponse } from "../../services/UserService";
import AuthAction, { AUTH_FAILURE, AUTH_SUCCESS } from "./authActionTypes";

export const authSuccess = (response: AxiosResponse<UserResponse>): AuthAction => ({
    type: AUTH_SUCCESS,
    payload: {
        response
    }
})

export const authFailure = (): AuthAction => ({
    type: AUTH_FAILURE
})