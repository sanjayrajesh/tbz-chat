import { MuiThemeProvider } from "@material-ui/core";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useState,
} from "react";
import defaultTheme from "../../style/defaultTheme";
import { Variant } from "../../style/themes";

type ThemeContextProps = {
    children: ReactNode;
};

type ThemeContextValue = {
    setTheme: (theme: Variant) => void;
};

const initialValue: ThemeContextValue = {
    setTheme: undefined!,
};

const ThemeContext = createContext(initialValue);

export const ThemeContextProvider = (props: ThemeContextProps) => {
    const [theme, setThemeInternal] = useState(defaultTheme.light);

    const setTheme = useCallback((theme: Variant) => {
        setThemeInternal(defaultTheme[theme]);
    }, []);

    return (
        <ThemeContext.Provider value={{ setTheme }}>
            <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
