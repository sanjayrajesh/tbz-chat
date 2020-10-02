import { RootState } from "../../redux/rootReducer";
import {AuthState} from '../../redux/auth/authReducer';
import { useSelector } from "react-redux";

const selector = (state: RootState): AuthState => state.auth

const useAuthState = () => useSelector(selector);

export default useAuthState;