import { Box, Grid, Typography } from "@material-ui/core";
import { FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import UserService, { CreateUserRequest } from "../../../services/UserService";
import useLanguage from "../../../util/hooks/useLanguage";
import ActionButton from "../../atoms/ActionButton";
import Center from "../../atoms/Center";
import TextField from "../../atoms/input/TextField";
import Link from "../../atoms/Link";
import Paper from "../../atoms/Paper";
import Page from "../../Page";
import { useStyle } from "../LoginPage";
import useValidationSchema from "./validationSchema";
import Form from "../../common/Form/Form";

const ENTER_EMAIL = "ENTER_EMAIL";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";

type State =
    | {
          status: typeof ENTER_EMAIL;
          email?: undefined;
      }
    | {
          status: typeof REGISTER_SUCCESS;
          email: string;
      };

const initialValues: CreateUserRequest = {
    email: "",
};

const RegisterPage = () => {
    const getString = useLanguage();
    const validationSchema = useValidationSchema();
    const [{ status, email }, setState] = useState<State>({
        status: ENTER_EMAIL,
    });
    const classes = useStyle();

    const handleSubmit = useCallback(
        (
            values: CreateUserRequest,
            helpers: FormikHelpers<CreateUserRequest>
        ) => {
            setTimeout(() => {
                UserService.create(values)
                    .then((res) => {
                        setState({
                            status: REGISTER_SUCCESS,
                            email: res.data.email,
                        });
                    })
                    .finally(() => {
                        helpers.setSubmitting(false);
                    });
            }, 3000);
        },
        []
    );

    return (
        <Page title={getString("sign.up")}>
            <Box clone width={1} height={1}>
                <Paper square>
                    <Center>
                        <Paper
                            title={
                                status === ENTER_EMAIL
                                    ? getString("sign.up.with.email")
                                    : getString("sign.up.success")
                            }
                            elevation={10}
                            className={classes.paper}
                        >
                            {status === ENTER_EMAIL ? (
                                <Form
                                    initialValues={initialValues}
                                    onSubmit={handleSubmit}
                                    validationSchema={validationSchema}
                                >
                                    {({ isSubmitting }) => (
                                            <Grid
                                                container
                                                direction="column"
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <TextField
                                                        name="email"
                                                        label={getString(
                                                            "email"
                                                        )}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <ActionButton
                                                        loading={isSubmitting}
                                                        type="submit"
                                                        fullWidth
                                                    >
                                                        {getString("sign.up")}
                                                    </ActionButton>
                                                </Grid>
                                                <Grid item>
                                                    <Link to="/login">
                                                        {getString(
                                                            "sign.in.link"
                                                        )}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                    )}
                                </Form>
                            ) : (
                                <Typography>
                                    {getString("invitation.sent.1")}
                                    <b>{email}</b>
                                    {getString("invitation.sent.2")}
                                </Typography>
                            )}
                        </Paper>
                    </Center>
                </Paper>
            </Box>
        </Page>
    );
};

export default RegisterPage;
