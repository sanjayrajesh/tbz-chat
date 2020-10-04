import { ButtonProps, CircularProgress, makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";

type ActionButtonProps = Omit<ButtonProps, "endIcon"> & {
    loading?: boolean;
};

const useStyle = makeStyles((theme) => ({
    spinner: {
        color: theme.palette.primary.contrastText,
    },
}));

const ActionButton = (props: ActionButtonProps) => {
    const { loading } = props;
    const classes = useStyle();
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => setSpinning(true), 500);

            return () => clearTimeout(timeout);
        } else {
            setSpinning(false);
        }
    }, [loading]);

    return (
        <Button
            {...props}
            {...{ loading: undefined }}
            endIcon={
                spinning ? (
                    <CircularProgress className={classes.spinner} size={25} />
                ) : undefined
            }
        />
    );
};

ActionButton.defaultProps = {
    variant: "contained",
    color: "primary",
    type: "submit",
} as ActionButtonProps;

export default ActionButton;
