import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

type ButtonProps = MuiButtonProps & {
    width?: 'thin' | 'medium' | 'wide'
}

const useStyle = makeStyles(theme => ({
    root: {
        
    }
}))

const Button = (props: ButtonProps) => {
    const classes = useStyle(props);

    return (
        <MuiButton {...props} className={clsx(props.className, classes.root)} />
    )
}

Button.defaultProps = {
    width: 'medium'
} as ButtonProps

export default Button
