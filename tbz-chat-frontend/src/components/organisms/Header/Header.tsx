import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import useAuthState from "../../../util/hooks/useAuthState";
import UserMenu from "./UserMenu";

const APP_NAME = "TBZ Chat";

type HeaderProps = {
    title: string;
};

const useStyle = makeStyles((theme) => ({
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
    const { title } = props;

    const classes = useStyle();
    const { user, status } = useAuthState();

    useEffect(() => {
        document.title = APP_NAME + " | " + title;
    }, [title]);

    return (
        <AppBar position="static" elevation={5}>
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
