import { useSelector } from "react-redux";
import { AuthStatus } from "../../redux/auth/authReducer";
import { RootState } from "../../redux/rootReducer";

const statusSelector = (state: RootState): AuthStatus => state.auth.status

const useAuthStatus = () => useSelector(statusSelector)

export default useAuthStatus;