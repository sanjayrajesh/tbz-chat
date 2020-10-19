import React, { forwardRef } from 'react'
import { useField } from 'formik';
import StyledTextField, { StyledTextFieldProps } from './StyledTextField';
import { useFormContext } from '../../common/Form/Form';
import useLanguage from '../../../util/hooks/useLanguage';

export type TextFieldProps = Omit<StyledTextFieldProps, "value" | "onChange" | "onBlur" | "validated"> & {
    name: string
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>((props: TextFieldProps, ref) => {

    const [field, meta] = useField(props.name);
    const {disableValidation} = useFormContext();
    const getString = useLanguage();

    const error = Boolean(meta.touched && meta.error);

    const helperText = error ? getString(meta.error!) : props.helperText;

    return (
        <StyledTextField {...field}  {...props} error={error} helperText={helperText} ref={ref} validated={!disableValidation} />
    )
})

TextField.defaultProps = {
    fullWidth: true
}

export default TextField
