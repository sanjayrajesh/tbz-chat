import { TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'

type StyledTextFieldProps = Omit<TextFieldProps, "variant">

const StyledTextField = (props: StyledTextFieldProps) => {
    return (
        <TextField {...props} />
    )
}

StyledTextField.defaultProps = {
    fullWidth: true,
    variant: "outlined"
} as StyledTextFieldProps

export default StyledTextField
