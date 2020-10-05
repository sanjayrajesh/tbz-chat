import { RootState } from "../redux/rootReducer";

interface Selector<T> {
    (state: RootState): T
}

export default Selector