import { Grid } from "@material-ui/core";
import { FormikHelpers } from "formik";
import React, { Fragment, useCallback, useState } from "react";
import useLanguage from "../../../util/hooks/useLanguage";
import ActionButton from "../../atoms/ActionButton";
import Button from "../../atoms/Button";
import PasswordField from "../../atoms/input/PasswordField";
import Form from "../../common/Form/Form";
import * as yup from "yup";
import UserService from "../../../services/UserService";

type Values = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const initialValues: Values = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

const validationSchema = yup.object({
    oldPassword: yup.string().required("validation.required"),
    newPassword: yup.string().required("validation.required").min(8, "validation.password.length").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d])(?=.*?[^\sa-zA-Z0-9]).+$/g, "validation.password.characters"),
    confirmNewPassword: yup.string().equals([yup.ref("newPassword")], "validation.password.match")
})

const PasswordForm = () => {
    const getString = useLanguage();
    const [editing, setEditing] = useState(false);

    const startEditing = useCallback(() => setEditing(true), []);
    const stopEditing = useCallback(() => setEditing(false), []);

    const handleSubmit = useCallback(
        (values: Values, helpers: FormikHelpers<Values>) => {
            UserService.updatePassword(values).then(stopEditing)
            .catch(() => {
                helpers.setFieldError("oldPassword", "incorrect.password");
            })
            .finally(() => {
                helpers.setSubmitting(false);
            })
        },
        [stopEditing]
    );

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onReset={stopEditing}
            validationSchema={validationSchema}
        >
            <Grid container spacing={2}>
                {editing ? (
                    <Fragment>
                        <Grid item xs={12}>
                            <PasswordField
                                name="oldPassword"
                                label={getString("old.password")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField
                                name="newPassword"
                                label={getString("new.password")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField
                                name="confirmNewPassword"
                                label={getString("confirm.password")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant="outlined" type="reset">
                                {getString("cancel")}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <ActionButton fullWidth>
                                {getString("change.password")}
                            </ActionButton>
                        </Grid>
                    </Fragment>
                ) : (
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={startEditing}
                        >
                            {getString("change.password")}
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Form>
    );
};

export default PasswordForm;
