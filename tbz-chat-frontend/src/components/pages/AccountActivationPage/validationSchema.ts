import { useMemo } from "react";
import * as yup from "yup";
import useLanguage from "../../../util/hooks/useLanguage";

const useValidationSchema = () => {
    const getString = useLanguage();
    const validationSchema = useMemo(() => yup.object({
        username: yup.string(),
        password: yup.string()
        .required(getString("validation.required"))
        .oneOf([yup.ref("confirmPassword")], getString("validation.password.match")),
        confirmPassword: yup.string()
        .required(getString("validation.required"))
        .oneOf([yup.ref("password")], getString("validation.password.match"))
    }), [getString]);

    return validationSchema;
}

export default useValidationSchema;