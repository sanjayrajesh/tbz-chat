import { useMemo } from "react";
import * as yup from "yup";
import UserService from "../../../services/UserService";
import useLanguage from "../../../util/hooks/useLanguage";

const useValidationSchema = () => {

    const getString = useLanguage();
    const schema = useMemo(() => yup.object({
        email: yup.string().email(getString("validation.email")).required(getString("validation.required")).test("isEmailAvailable", getString("validation.email.not.available"), email => UserService.isEmailAvailable(email!))
    }), [getString]);

    return schema;
}

export default useValidationSchema