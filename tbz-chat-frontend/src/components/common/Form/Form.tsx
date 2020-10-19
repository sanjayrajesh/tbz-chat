import React, { createContext, useContext } from "react";
import {
    Formik,
    FormikValues,
    FormikConfig,
    Form as FormikForm
} from "formik";
import { FormikContextType } from "formik";

type ExtraProps = {
    disableValidation?: boolean;
};

type FormProps<Values extends FormikValues = FormikValues> = Omit<
    FormikConfig<Values>,
    "children"
> &
    ExtraProps;

type FormContextType<Values> = FormikContextType<Values> & {
    disableValidation: boolean;
};

const FormContext = createContext<FormContextType<any>>(undefined as any);

export const useFormContext = () => {
    const context = useContext(FormContext);

    return context;
};

const isRenderFunction = (
    children: any
): children is (props: FormContextType<FormikValues>) => JSX.Element => {
    return typeof children === "function";
};

const Form = <Values extends FormikValues = FormikValues>(
    props: FormProps<Values> & {
        children: (props: FormContextType<Values>) => JSX.Element | JSX.Element;
    }
) => {
    const { disableValidation, children, validationSchema, ...rest } = props;

    return (
        <Formik
            {...rest}
            validationSchema={validationSchema}
        >
            {formikProps => {
                const contextValue: FormContextType<Values> = {
                    ...formikProps,
                    disableValidation: !validationSchema || !!disableValidation
                }

                return (
                    <FormContext.Provider value={contextValue}>
                        <FormikForm>
                        {isRenderFunction(children) ? children(contextValue) : children}
                        </FormikForm>
                    </FormContext.Provider>
                )
            }}
        </Formik>
    );
};

export default Form;
