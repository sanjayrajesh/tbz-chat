import { RootState } from "../redux/rootReducer";

type SelectorWithProps<T, P> = (state: RootState, props: P) => T;

export default SelectorWithProps;