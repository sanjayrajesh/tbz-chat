import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { authenticateFromToken } from "../redux/globalActions";
import useThunkDispatch from "../util/hooks/useThunkDispatch";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import AccountActivationPage from "./pages/AccountActivationPage/AccountActivationPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TestPage from "./pages/TestPage";
import Route from "./Route";

const App = () => {
    const dispatch = useThunkDispatch();

    useEffect(() => {
        dispatch(authenticateFromToken());
    }, [dispatch]);

    return (
        <ThemeContextProvider>
            <CssBaseline />
            <LanguageContextProvider>
                <BrowserRouter>
                    <Switch>
                        <Route secure exact path="/" component={ChatPage} />
                        <Route path="/sign-in" component={LoginPage} />
                        <Route
                            path="/sign-up"
                            component={RegisterPage}
                        />
                        <Route secure path="/profile" component={ProfilePage} />
                        <Route exact path="/activate-account/:token" component={AccountActivationPage} />
                        <Route exact path="/test" component={TestPage} />
                    </Switch>
                </BrowserRouter>
            </LanguageContextProvider>
        </ThemeContextProvider>
    );
};

export default App;
