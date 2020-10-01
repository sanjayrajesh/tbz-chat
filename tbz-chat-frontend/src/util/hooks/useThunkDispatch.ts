import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootAction, RootState } from "../../redux/rootReducer";

const useThunkDispatch = () => useDispatch<ThunkDispatch<RootState, void, RootAction>>()

export default useThunkDispatch