import React from 'react'
import { Redirect, Route as DomRoute, RouteProps as DomRouteProps } from 'react-router-dom'
import useAuthStatus from '../util/hooks/useAuthStatus'

type RouteProps = DomRouteProps & {
    secure?: boolean
}

const Route = (props: RouteProps) => {

    const {secure} = props;
    const authStatus = useAuthStatus();

    if(authStatus === 'PENDING') {
        return (
            <h1>Loading...</h1>
        )
    } else if (secure && authStatus !== 'AUTHENTICATED') {
        return (
            <Redirect to="/sign-in" />
        )
    } else return (
        <DomRoute {...props} {...{secure: undefined}} />
    )
}

export default Route
