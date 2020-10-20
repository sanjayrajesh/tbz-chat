import { MuiThemeProvider } from "@material-ui/core";
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import theme, { Variant } from "../../style/theme";

const VARIANT_KEY = "variant";

type ThemeContextProps = {
    children: ReactNode;
};

type ThemeContextValue = {
    setVariant: Dispatch<SetStateAction<Variant>>;
    variant: Variant;
};

const initialValue: ThemeContextValue = {
    setVariant: undefined!,
    variant: "dark"
};

const ThemeContext = createContext(initialValue);

export const ThemeContextProvider = (props: ThemeContextProps) => {
    const [variant, setVariant] = useState<Variant>(() => localStorage.getItem(VARIANT_KEY) as Variant || "dark");

    useEffect(() => {
        localStorage.setItem(VARIANT_KEY, variant);
    }, [variant]);

    return (
        <ThemeContext.Provider value={{ variant, setVariant }}>
            <MuiThemeProvider theme={theme[variant]}>{props.children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
