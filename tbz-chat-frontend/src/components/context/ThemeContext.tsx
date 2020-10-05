import { MuiThemeProvider } from '@material-ui/core'
import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import themes, { ThemeKey } from '../../style/themes';

type ThemeContextProps = {
    children: ReactNode
}

type ThemeContextValue = {
    setTheme: (theme: ThemeKey) => void
}

const initialValue: ThemeContextValue = {
    setTheme: undefined!
}

const ThemeContext = createContext(initialValue);

export const ThemeContextProvider = (props: ThemeContextProps) => {

    const [theme, setThemeInternal] = useState(themes['starWarsDark']);

    const setTheme = useCallback((theme: ThemeKey) => {
        setThemeInternal(themes[theme])
    }, []);

    useEffect(() => {
        console.log("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{setTheme}}>
            <MuiThemeProvider theme={theme}>
                {props.children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContext
