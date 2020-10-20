import { IconButton, Tooltip } from '@material-ui/core';
import React, { useCallback, useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import LightThemeIcon from "@material-ui/icons/Brightness7";
import DarkThemeIcon from "@material-ui/icons/Brightness3";
import useLanguage from '../../../util/hooks/useLanguage';

const ThemeSwitch = () => {

    const {variant, setVariant} = useContext(ThemeContext);
    const getString = useLanguage();

    const toggleVariant = useCallback(() => {
        setVariant(variant => variant === "light" ? "dark" : "light");
    }, [setVariant]);

    return (
        <Tooltip title={getString("switch.to.theme", getString(variant === "light" ? "dark" : "light"))}>
        <IconButton color="inherit" onClick={toggleVariant}>
            {variant === "light" ? <LightThemeIcon /> : <DarkThemeIcon />}
        </IconButton>
        </Tooltip>
    )
}

export default ThemeSwitch
