import React from 'react'
import {Button as MuiButton, ButtonProps as MuiButtonProps, makeStyles} from '@material-ui/core';
import clsx from 'clsx';

export type ButtonProps = MuiButtonProps & {

}

const useStyle = makeStyles(theme => ({
    root: {
        "&.Mui-disabled": {
            "&.MuiButton-containedPrimary": {
                backgroundColor: theme.palette.primary.light,
                //color: theme.palette.primary.contrastText
            },
            "&.MuiButton-outlinedPrimary": {
                borderColor: theme.palette.primary.light,
                //color: theme.palette.primary.contrastText
            }
        }
    }
}), {name: "Button"});

const Button = (props: ButtonProps) => {
    const classes = useStyle();
    const {className, ...rest} = props;
    return (
        <MuiButton {...rest} className={clsx(classes.root, className)} />
    )
}

export default Button
