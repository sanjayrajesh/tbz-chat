import { RootState } from "../redux/rootReducer";

type Selector<T> = (state: RootState) => T;

export default Selector;