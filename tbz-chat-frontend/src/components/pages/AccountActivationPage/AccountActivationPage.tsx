import { Box, Grid } from "@material-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { login } from "../../../redux/globalActions";
import VerificationService from "../../../services/VerificationService";
import useLanguage from "../../../util/hooks/useLanguage";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import ActionButton from "../../atoms/ActionButton";
import Center from "../../atoms/Center";
import PasswordField from "../../atoms/input/PasswordField";
import TextField from "../../atoms/input/TextField";
import Paper from "../../atoms/Paper";
import Page from "../../Page";
import { useStyle } from "../LoginPage";

type Params = {
    token: string;
};

type FormValues = {
    username: string;
    password: string;
    confirmPassword: string;
};

const initialValues: FormValues = {
    username: "",
    password: "",
    confirmPassword: "",
};

const AccountActivationPage = () => {
    const { token } = useParams<Params>();
    const getString = useLanguage();
    const classes = useStyle();
    const dispatch = useThunkDispatch();
    const history = useHistory();

    const handleSubmit = (
        values: FormValues,
        helpers: FormikHelpers<FormValues>
    ) => {
        VerificationService.activateAccount(values, token)
            .then((res) => {
                dispatch(
                    login({ email: res.data.email, password: values.password })
                ).then(() => {
                    history.push("/");
                });
            })
            .finally(() => {
                helpers.setSubmitting(false);
            });
    };

    return (
        <Page title={getString("activate.account")}>
            <Box clone width={1} height={1}>
                <Paper square>
                    <Center>
                        <Paper
                            title={getString("activate.your.account")}
                            className={classes.paper}
                        >
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Grid
                                            container
                                            direction="column"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <TextField
                                                    name="username"
                                                    label={getString(
                                                        "username"
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <PasswordField
                                                    name="password"
                                                    label={getString(
                                                        "password"
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <PasswordField
                                                    name="confirmPassword"
                                                    label={getString(
                                                        "confirm.password"
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <ActionButton
                                                    fullWidth
                                                    loading={isSubmitting}
                                                >
                                                    {getString(
                                                        "activate.account"
                                                    )}
                                                </ActionButton>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Center>
                </Paper>
            </Box>
        </Page>
    );
};

export default AccountActivationPage;
