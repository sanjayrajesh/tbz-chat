import User from "../../models/User";
import AuthAction, { AUTH_FAILURE, AUTH_SUCCESS } from "./authActionTypes";

const AUTH_TOKEN_KEY = '0e272236-e76c-4022-8475-7540e794fd44';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

const setAuthToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token);

const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

type AuthStatus = 'PENDING' | 'AUTHENTICATED' | 'FAILURE'

type AuthState = {
    user?: User,
    status: AuthStatus
}

const initialState: AuthState = {
    user: undefined,
    status: 'PENDING'
}

const authReducer = (state: AuthState | undefined = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_SUCCESS:
            const response = action.payload.response;
            setAuthToken(response.headers['authorization']);

            const {id, email, username} = response.data;

            return {
                user: {
                    id, email, username
                },
                status: 'AUTHENTICATED'
            }
        case AUTH_FAILURE:
            clearAuthToken();

            return {
                user: undefined,
                status: 'FAILURE'
            }
        default:
            return state;
    }
}

export default authReducer;