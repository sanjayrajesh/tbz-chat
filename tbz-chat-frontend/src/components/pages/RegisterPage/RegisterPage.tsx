import { Grid } from '@material-ui/core'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useCallback } from 'react'
import { CreateUserRequest } from '../../../services/UserService'
import useLanguage from '../../../util/hooks/useLanguage'
import useThunkDispatch from '../../../util/hooks/useThunkDispatch'
import ActionButton from '../../atoms/ActionButton'
import Center from '../../atoms/Center'
import TextField from '../../atoms/input/TextField'
import Paper from '../../atoms/Paper'
import Page from '../../Page'

const initialValues: CreateUserRequest = {
    email: ""
}

const RegisterPage = () => {

    const getString = useLanguage();
    const dispatch = useThunkDispatch();

    const handleSubmit = useCallback((values: CreateUserRequest, helpers: FormikHelpers<CreateUserRequest>) => {

    }, [dispatch]);

    return (
        <Page title={getString("register")}>
            <Center>
                <Paper title={getString("register.with.email")}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <TextField name="email" label={getString("email")} />
                                    </Grid>
                                    <Grid item>
                                        <ActionButton loading={isSubmitting} type="submit">
                                            {getString("register")}
                                        </ActionButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Center>
        </Page>
    )
}

export default RegisterPage
