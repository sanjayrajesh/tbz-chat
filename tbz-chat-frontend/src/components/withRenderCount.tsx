import { ComponentType } from "react";
import useRenderCount from "../util/hooks/useRenderCount";
import React from "react";

const withRenderCount = <P extends object>(Component: ComponentType<P>) => {

    const componentName = Component.displayName || Component.name;

    return (props: P) => {
        useRenderCount(componentName);

        return <Component {...props} />
    }
}

export default withRenderCount;