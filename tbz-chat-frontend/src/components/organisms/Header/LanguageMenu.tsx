import { makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { ChangeEvent, useCallback, useContext } from 'react'
import { Language } from '../../../language/language';
import useLanguage from '../../../util/hooks/useLanguage';
import LanguageContext from '../../context/LanguageContext'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyle = makeStyles(theme => ({
    root: {
        "&:before": {
            display: "none"
        },
        fontSize: theme.typography.h6.fontSize,
        marginLeft: theme.spacing(2)
    }
}))

const LanguageMenu = () => {

    const { language, setLanguage } = useContext(LanguageContext);
    const getString = useLanguage();
    const classes = useStyle();

    const handleChange = useCallback((e: ChangeEvent<{ value: unknown }>) => {
        setLanguage(e.target.value as Language);
    }, [setLanguage]);

    return (
        <Select className={classes.root} value={language} onChange={handleChange} IconComponent={ExpandMoreIcon}>
            <MenuItem value="en">
                {getString("english")}
            </MenuItem>
            <MenuItem value="de">
                {getString("german")}
            </MenuItem>
        </Select>
    )
}

export default LanguageMenu
