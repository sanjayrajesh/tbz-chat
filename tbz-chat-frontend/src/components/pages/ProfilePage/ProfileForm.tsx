import { Grid } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import React, { Fragment, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import User from '../../../models/User';
import { updateAuthenticated } from '../../../redux/auth/authActions';
import { getAuthUser } from '../../../redux/auth/authSelectors'
import useLanguage from '../../../util/hooks/useLanguage';
import useThunkDispatch from '../../../util/hooks/useThunkDispatch';
import ActionButton from '../../atoms/ActionButton';
import Button from '../../atoms/Button';
import TextField from '../../atoms/input/TextField';
import Form from '../../common/Form/Form';
import * as yup from "yup";
import UserService from '../../../services/UserService';

const validationSchema = yup.object({
    username: yup.string().nullable().notRequired(),
    email: yup.string().required("validation.required").email("validation.email").test("isEmailAvailable", "validation.email.not.available", email => {
        if(email) {
            return UserService.isEmailAvailable(email, true)
        } else {
            return Promise.resolve(true);
        }
    })
})

const ProfileForm = () => {

    const user = useSelector(getAuthUser);
    const [editing, setEditing] = useState(false);
    const getString = useLanguage();
    const dispatch = useThunkDispatch();

    const startEditing = useCallback(() => setEditing(true), []);
    const stopEditing = useCallback(() => setEditing(false), []);

    const handleSubmit = useCallback((values: User, helpers: FormikHelpers<User>) => {
        dispatch(updateAuthenticated(values, () => {
            helpers.setSubmitting(false);
            stopEditing();
        }))
    }, [dispatch, stopEditing]);

    const handleReset = useCallback(() => {
        stopEditing();
    }, [stopEditing]);

    return (
        <Form
            initialValues={user}
            onSubmit={handleSubmit}
            onReset={handleReset}
            readOnly={!editing}
            enableReinitialize
            validationSchema={validationSchema}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField name="username" label={getString("username")} />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="email" label={getString("email")} />
                </Grid>
                {editing ? (
                    <Fragment>
                        <Grid item xs={6}>
                            <Button fullWidth variant="outlined" type="reset">
                                {getString("cancel")}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <ActionButton fullWidth>
                                {getString("save")}
                            </ActionButton>
                        </Grid>
                    </Fragment>
                ) : (
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" color="primary" onClick={startEditing}>
                            {getString("edit")}
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Form>
    )
}

export default ProfileForm
