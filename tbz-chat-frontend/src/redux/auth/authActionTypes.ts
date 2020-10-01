import { AxiosResponse } from "axios"
import { UserResponse } from "../../services/UserService"

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'

type AuthSuccess = {
    type: typeof AUTH_SUCCESS,
    payload: {
        response: AxiosResponse<UserResponse>
    }
}

type AuthFailure = {
    type: typeof AUTH_FAILURE
}

type AuthAction = AuthSuccess | AuthFailure

export default AuthAction;