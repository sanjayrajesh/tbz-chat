import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import useAuthState from "../../../util/hooks/useAuthState";
import { APP_NAME } from "../../Page";
import UserMenu from "./UserMenu";

type HeaderProps = {
    title: string;
};

const useStyle = makeStyles((theme) => ({
    root: {

    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
    },
    brand: {
        flexGrow: 1,
    },
}));

const Header = (props: HeaderProps) => {
    const classes = useStyle();
    const { user, status } = useAuthState();

    return (
        <AppBar className={classes.root} position="static" elevation={5}>
            <Toolbar className={classes.toolbar}>
                <div className={classes.brand}>
                    <Typography variant="h3">{APP_NAME}</Typography>
                </div>
                <div>
                    {status === "AUTHENTICATED" ? (
                        <UserMenu user={user!} />
                    ) : null}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
