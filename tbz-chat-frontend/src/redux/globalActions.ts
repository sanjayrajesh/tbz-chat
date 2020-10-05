import { ThunkAction } from "redux-thunk";
import LoginService, { LoginRequest } from "../services/LoginService";
import { authFailure, authSuccess, loginFailure, loginSuccess } from "./auth/authActions";
import { RootAction, RootState } from "./rootReducer";
import UserService from "../services/UserService";

export const authenticateFromToken: () => ThunkAction<Promise<void>, RootState, void, RootAction> = () => async dispatch => {
    try {
        const response = await UserService.getOwn();

        dispatch(authSuccess(response));
    } catch (error) {
        dispatch(authFailure());
    }
}

export const login: (login: LoginRequest) => ThunkAction<Promise<void>, RootState, void, RootAction> = login => async dispatch => {
    try {
        const response = await LoginService.login(login);

        dispatch(loginSuccess(response));

    } catch (err) {
        dispatch(loginFailure());
        throw err;
    }
}