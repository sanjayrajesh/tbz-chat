import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
} from "@material-ui/core";
import React, { Fragment, useCallback } from "react";
import AddIcon from "@material-ui/icons/Add";
import useDialog from "../../../util/hooks/useDialog";
import useLanguage from "../../../util/hooks/useLanguage";
import { FormikHelpers } from "formik";
import User from "../../../models/User";
import TextField from "../../atoms/input/TextField";
import UserSelect from "../../molecules/UserSelect/UserSelect";
import ActionButton from "../../atoms/ActionButton";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import { createChat } from "../../../redux/chat/chatActions";
import Form from "../../common/Form/Form";
import * as yup from "yup";

type Values = {
    name: string;
    users: User[];
};

const initialValues: Values = {
    name: "",
    users: [],
};

const validationSchema = yup.object({
    name: yup.string().required("validation.required"),
    users: yup.array(yup.object({
        id: yup.string().required()
    })).min(1, "validation.users.required")
})

const CreateChatButton = () => {
    const [open, openDialog, closeDialog] = useDialog();
    const getString = useLanguage();
    const dispatch = useThunkDispatch();

    const handleSubmit = useCallback(
        (values: Values, helpers: FormikHelpers<Values>) => {
            dispatch(
                createChat({
                    ...values,
                    userIds: values.users.map((user) => user.id),
                })
            )
                .then(closeDialog)
                .finally(() => helpers.setSubmitting(false));
        },
        [closeDialog, dispatch]
    );

    return (
        <Fragment>
            <IconButton onClick={openDialog}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>{getString("create.chat")}</DialogTitle>
                <Form
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting }) => (
                        <Fragment>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="name"
                                            label={getString("name")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <UserSelect
                                            name="users"
                                            label={getString("members")}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="outlined"
                                    onClick={closeDialog}
                                >
                                    {getString("cancel")}
                                </Button>
                                <ActionButton loading={isSubmitting}>
                                    {getString("create")}
                                </ActionButton>
                            </DialogActions>
                        </Fragment>
                    )}
                </Form>
            </Dialog>
        </Fragment>
    );
};

export default CreateChatButton;
