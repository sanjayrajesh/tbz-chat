import { useEffect, useRef } from "react";

type CounterMap = {
    [name: string]: number;
};

let counterMap: CounterMap = {};

const getName = (name: string) => {
    if (name in counterMap) {
        counterMap[name]++;
    } else {
        counterMap[name] = 0;
    }

    return name + "-" + counterMap[name];
};

const useRenderCount = (componentName: string) => {
    const renderCount = useRef(1);
    const name = useRef(getName(componentName));

    useEffect(() => {
        console.log(`${name.current} rendered ${renderCount.current} times`);
        renderCount.current++;
    });
};

export default useRenderCount;
