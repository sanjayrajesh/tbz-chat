import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { authenticateFromToken } from "../redux/globalActions";
import useThunkDispatch from "../util/hooks/useThunkDispatch";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
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
                        <Route exact path="/login" component={LoginPage} />
                        <Route
                            exact
                            path="/register"
                            component={RegisterPage}
                        />
                        <Route secure exact path="/" component={ChatPage} />
                    </Switch>
                </BrowserRouter>
            </LanguageContextProvider>
        </ThemeContextProvider>
    );
};

export default App;
