import { AxiosResponse } from "axios"
import User from "../../models/User"
import { UserResponse } from "../../services/UserService"

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const UPDATE_AUTHENTICATED = "UPDATE_AUTHENTICATED"

type AuthSuccess = {
    type: typeof AUTH_SUCCESS,
    payload: {
        response: AxiosResponse<UserResponse>
    }
}

type AuthFailure = {
    type: typeof AUTH_FAILURE
}

type LoginSuccess = {
    type: typeof LOGIN_SUCCESS,
    payload: {
        response: AxiosResponse<UserResponse>
    }
}

type LoginFailure = {
    type: typeof LOGIN_FAILURE
}

type Logout = {
    type: typeof LOGOUT
}

type UpdateAuthenticated = {
    type: typeof UPDATE_AUTHENTICATED,
    payload: {
        user: User
    }
}

type AuthAction = AuthSuccess | AuthFailure | LoginSuccess | LoginFailure | Logout | UpdateAuthenticated

export default AuthAction;