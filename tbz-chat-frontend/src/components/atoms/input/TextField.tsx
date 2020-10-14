import React, { forwardRef } from 'react'
import {TextFieldProps as MuiTextFieldProps} from '@material-ui/core';
import { useField } from 'formik';
import StyledTextField from './StyledTextField';

export type TextFieldProps = Omit<MuiTextFieldProps, "value" | "onChange" | "onBlur"> & {
    name: string
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>((props: TextFieldProps, ref) => {

    const [field, meta] = useField(props.name);

    const error = Boolean(meta.touched && meta.error);

    const helperText = error ? meta.error : props.helperText;

    return (
        <StyledTextField {...field}  {...props} error={error} helperText={helperText} ref={ref} />
    )
})

TextField.defaultProps = {
    fullWidth: true
}

export default TextField
