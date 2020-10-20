import { InputLabelProps as MuiInputLabelProps, makeStyles, OutlinedInputProps, TextField, TextFieldProps } from '@material-ui/core'
import clsx from 'clsx';
import React, { forwardRef } from 'react'

export type StyledTextFieldProps = Omit<TextFieldProps, "variant" | "color"> & {
    readOnly?: boolean;
    validated?: boolean;
}

const useStyle = makeStyles(theme => {
    const borderColor = theme.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.3)"

    return {
        root: {
            "&$validated .MuiInputBase-root:not(.Mui-error)": {
                marginBottom: "22px"
            },
            "& .MuiFormHelperText-root": {
                //fontSize: "1rem"
            }
        },
        readonly: {
            "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                    borderColor
                },
                "&.Mui-focused fieldset": {
                    borderColor,
                    borderWidth: 1
                },
                "& input": {
                    cursor: "text",
                }
            },
            "& .MuiFormLabel-root": {
                color: borderColor
            }
        },
        validated: {}
    }
}, {name: "TextField"});

const StyledTextField = forwardRef<HTMLDivElement, StyledTextFieldProps>((props: StyledTextFieldProps, ref) => {
    const {className, readOnly, InputLabelProps, InputProps, validated, ...rest} = props;
    const classes = useStyle();

    const _InputLabelProps: Partial<MuiInputLabelProps> = {
        ...InputLabelProps,
        shrink: readOnly ? true : InputLabelProps?.shrink
    }

    const _InputProps: Partial<OutlinedInputProps> = {
        ...InputProps,
        disabled: readOnly || InputProps?.disabled
    }

    return (
        <TextField {...rest} ref={ref} variant="outlined" color="primary" className={clsx({[classes.readonly]: readOnly, [classes.validated]: validated}, className)} classes={{root: classes.root}} InputLabelProps={_InputLabelProps} InputProps={_InputProps} />
    )
})

StyledTextField.defaultProps = {
    fullWidth: true,
} as StyledTextFieldProps

export default StyledTextField
