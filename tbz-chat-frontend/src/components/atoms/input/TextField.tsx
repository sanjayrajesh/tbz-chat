import React from 'react'
import {TextFieldProps as MuiTextFieldProps} from '@material-ui/core';
import { useField } from 'formik';
import StyledTextField from './StyledTextField';

export type TextFieldProps = Omit<MuiTextFieldProps, "value" | "onChange" | "onBlur"> & {
    name: string
}

const TextField = (props: TextFieldProps) => {

    const [field, meta] = useField(props.name);

    const error = Boolean(meta.touched && meta.error);

    const helperText = error ? meta.error : props.helperText;

    return (
        <StyledTextField {...field}  {...props} error={error} helperText={helperText} />
    )
}

TextField.defaultProps = {
    fullWidth: true
}

export default TextField
