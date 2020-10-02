import User from "../../models/User";
import { UserResponse } from "../../services/UserService";
import AuthAction, { AUTH_FAILURE, AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS } from "./authActionTypes";

const AUTH_TOKEN_KEY = '0e272236-e76c-4022-8475-7540e794fd44';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

const setAuthToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token);

const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

export type AuthStatus = 'PENDING' | 'AUTHENTICATED' | 'AUTH_FAILURE' | 'LOGIN_FAILURE'

export type AuthState = {
    status: AuthStatus,
    user?: undefined
} | {
    status: 'AUTHENTICATED',
    user: User
}

const initialState: AuthState = {
    status: 'PENDING'
}

const handleSuccess = (user: UserResponse): AuthState => {
    const {id, email, username} = user;

    return {
        user: {id, email, username},
        status: 'AUTHENTICATED'
    }
}

const authReducer = (state: AuthState | undefined = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const response = action.payload.response;
            setAuthToken(response.headers['authorization']);

            return handleSuccess(response.data);
        case LOGIN_FAILURE:
            return {
                status: 'LOGIN_FAILURE'
            }
        case AUTH_SUCCESS:
            return handleSuccess(action.payload.response.data);
        case AUTH_FAILURE:
            clearAuthToken();

            return {
                status: 'AUTH_FAILURE'
            }
        default:
            return state;
    }
}

export default authReducer;