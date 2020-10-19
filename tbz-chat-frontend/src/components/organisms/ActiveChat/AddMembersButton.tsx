import React, { Fragment, useCallback } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@material-ui/core";
import useDialog from "../../../util/hooks/useDialog";
import User from "../../../models/User";
import useLanguage from "../../../util/hooks/useLanguage";
import { FormikHelpers } from "formik";
import UserSelect from "../../molecules/UserSelect/UserSelect";
import ActionButton from "../../atoms/ActionButton";
import { useSelector } from "react-redux";
import { getSelectedChatId } from "../../../redux/chat/chatSelectors";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import { addChatMembers } from "../../../redux/chat/chatActions";
import Form from "../../common/Form/Form";
import * as yup from "yup";

type Values = {
    users: User[];
};

const initialValues: Values = {
    users: [],
};

const validationSchema = yup.object({
    users: yup.array(yup.object({
        id: yup.string()
    })).min(1, "validation.users.required")
})

const AddMembersButton = () => {
    const [open, openDialog, closeDialog] = useDialog();
    const getString = useLanguage();
    const selectedChatId = useSelector(getSelectedChatId);
    const dispatch = useThunkDispatch();

    const handleSubmit = useCallback(
        (values: Values, helpers: FormikHelpers<Values>) => {
            dispatch(
                addChatMembers(selectedChatId!, values.users, closeDialog)
            ).finally(() => helpers.setSubmitting(false));
        },
        [dispatch, selectedChatId, closeDialog]
    );

    return (
        <Fragment>
            <IconButton onClick={openDialog}>
                <AddIcon />
            </IconButton>

            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>{getString("add.members")}</DialogTitle>
                <Form
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting }) => (
                        <Fragment>
                            <DialogContent>
                                <UserSelect
                                    name="users"
                                    label={getString("members")}
                                    excludeChatId={selectedChatId}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="outlined"
                                    onClick={closeDialog}
                                >
                                    {getString("cancel")}
                                </Button>
                                <ActionButton loading={isSubmitting}>
                                    {getString("add")}
                                </ActionButton>
                            </DialogActions>
                        </Fragment>
                    )}
                </Form>
            </Dialog>
        </Fragment>
    );
};

export default AddMembersButton;
