import {
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Typography
} from "@material-ui/core";
import React, { FormEvent, Fragment, useState } from "react";
import useLanguage from "../../util/hooks/useLanguage";

type DangerActionProps = Omit<ButtonProps, "onClick" | "action"> & {
    confirmationTitle?: string;
    confirmationBody: string;
    action: (() => void) | (() => Promise<void>);
};

const useStyle = makeStyles((theme) => ({
    dialogContent: {
        "&:first-child": {
            paddingTop: theme.spacing(1),
        },
    },
    dialogActions: {
        padding: theme.spacing(1, 3)
    }
}));

const isPromise = (value: any): value is Promise<void> =>
    value instanceof Promise;

const DangerAction = (props: DangerActionProps) => {
    const getString = useLanguage();
    const { action, confirmationTitle, confirmationBody, ...rest } = props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const classes = useStyle();

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    const handleCancel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        closeDialog();
    };

    const handleConfirm = () => {
        const result = action();

        if (isPromise(result)) {
            result.then(closeDialog);
        } else {
            closeDialog();
        }
    };

    return (
        <Fragment>
            <Button {...rest} onClick={openDialog} />
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <form onSubmit={handleCancel}>
                    {confirmationTitle ? (
                        <DialogTitle>{confirmationTitle}</DialogTitle>
                    ) : null}
                    <DialogContent className={classes.dialogContent}>
                        <Typography variant="h6" align="center">
                            {confirmationBody}
                        </Typography>
                    </DialogContent>
                    <DialogActions className={classes.dialogActions}>
                        <Button
                            tabIndex={0}
                            variant="outlined"
                            type="submit"
                            autoFocus
                            fullWidth
                        >
                            {getString("cancel")}
                        </Button>
                        <Button
                            tabIndex={1}
                            variant="contained"
                            color="primary"
                            onClick={handleConfirm}
                            fullWidth
                        >
                            {getString("confirm")}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default DangerAction;
