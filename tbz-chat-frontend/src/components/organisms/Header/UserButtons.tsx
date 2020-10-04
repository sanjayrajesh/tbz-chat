import { Grid, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import User from "../../../models/User";
import { logout } from "../../../redux/auth/authActions";
import useLanguage from "../../../util/hooks/useLanguage";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import Link from "../../atoms/Link";

type UserButtonsProps = {
    user: User;
};

const UserButtons = (props: UserButtonsProps) => {
    const { user } = props;
    const getString = useLanguage();
    const dispatch = useThunkDispatch();

    const handleSignout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <Grid container direction="row" spacing={2} alignItems="baseline">
            <Grid item>
                <Typography variant="h5">
                    {user.username || user.email}
                </Typography>
            </Grid>
            <Grid item>
                <Link to="/profile" variant="h5" color="inherit">
                    {getString("profile")}
                </Link>
            </Grid>
            <Grid item>
                <Link onClick={handleSignout} color="inherit" variant="h5">
                    {getString("sign.out")}
                </Link>
            </Grid>
        </Grid>
    );
};

export default UserButtons;
