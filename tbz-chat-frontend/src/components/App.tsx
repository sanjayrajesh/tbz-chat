import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { authenticateFromToken } from "../redux/globalActions";
import useThunkDispatch from "../util/hooks/useThunkDispatch";
import { LanguageContextProvider } from "./context/LanguageContext";
import LoginPage from "./pages/LoginPage";
import Route from "./Route";

const App = () => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(authenticateFromToken());
  }, [dispatch]);

  return (
    <LanguageContextProvider>
      <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" />
            <Route secure exact path="/" />
          </Switch>
      </BrowserRouter>
    </LanguageContextProvider>
  );
};

export default App;
