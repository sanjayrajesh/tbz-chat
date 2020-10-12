import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useCallback } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/globalActions";
import { LoginRequest } from "../../services/LoginService";
import useAuthStatus from "../../util/hooks/useAuthStatus";
import useLanguage from "../../util/hooks/useLanguage";
import useThunkDispatch from "../../util/hooks/useThunkDispatch";
import ActionButton from "../atoms/ActionButton";
import Center from "../atoms/Center";
import PasswordField from "../atoms/input/PasswordField";
import TextField from "../atoms/input/TextField";
import Link from "../atoms/Link";
import Paper from "../atoms/Paper";
import Page from "../Page";

const initialValues: LoginRequest = {
    email: "",
    password: "",
};

export const useStyle = makeStyles((theme) => ({
    paper: {
        width: theme.breakpoints.width("sm") * 0.75,
    },
}));

const LoginPage = () => {
    const getString = useLanguage();
    const dispatch = useThunkDispatch();
    const authStatus = useAuthStatus();
    const classes = useStyle();

    const handleSubmit = useCallback(
        (values: LoginRequest, helpers: FormikHelpers<LoginRequest>) => {
            dispatch(login(values)).catch(() => helpers.setSubmitting(false));
        },
        [dispatch]
    );

    if (authStatus === "AUTHENTICATED") {
        return <Redirect to="/" />;
    }

    return (
        <Page title={getString("sign.in")}>
            <Box clone width={1} height={1}>
                <Paper square>
                    <Center>
                        <Paper className={classes.paper} elevation={10}>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Grid
                                            container
                                            spacing={2}
                                            direction="column"
                                        >
                                            <Grid item>
                                                <TextField
                                                    name="email"
                                                    label={getString("email")}
                                                    autoComplete="email"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <PasswordField
                                                    name="password"
                                                    label={getString(
                                                        "password"
                                                    )}
                                                    autoComplete="currentPassword"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Box
                                                    height="1rem"
                                                    color="error.main"
                                                >
                                                    {authStatus ===
                                                    "LOGIN_FAILURE" ? (
                                                        <Typography>
                                                            {getString(
                                                                "login.failure"
                                                            )}
                                                        </Typography>
                                                    ) : null}
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <ActionButton
                                                    loading={isSubmitting}
                                                    type="submit"
                                                    fullWidth
                                                >
                                                    {getString("sign.in")}
                                                </ActionButton>
                                            </Grid>
                                            <Grid item>
                                              <Link to="/sign-up">
                                                {getString("sign.up.link")}
                                              </Link>
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

export default LoginPage;
