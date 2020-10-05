import Selector from "./Selector";

interface SelectorCreator<T, P> {
    (props: P): Selector<T>
}

export default SelectorCreator