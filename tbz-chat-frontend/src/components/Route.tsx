import React from 'react'
import { Redirect, Route as DomRoute, RouteProps as DomRouteProps, useLocation } from 'react-router-dom'
import useAuthStatus from '../util/hooks/useAuthStatus'
import { setInitialRequest } from './pages/LoginPage';

type RouteProps = DomRouteProps & {
    secure?: boolean
}

const Route = (props: RouteProps) => {

    const {secure} = props;
    const authStatus = useAuthStatus();
    const location = useLocation();

    setInitialRequest(location.pathname);

    if(authStatus === 'PENDING') {
        return (
            <h1>Loading...</h1>
        )
    } else if (secure && authStatus !== 'AUTHENTICATED') {
        return (
            <Redirect to="/login" />
        )
    } else return (
        <DomRoute {...props} {...{secure: undefined}} />
    )
}

export default Route
