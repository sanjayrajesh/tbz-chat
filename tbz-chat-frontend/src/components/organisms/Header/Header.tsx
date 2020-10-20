import {
    AppBar,
    Box,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React from "react";
import useAuthState from "../../../util/hooks/useAuthState";
import { APP_NAME } from "../../Page";
import LanguageMenu from "./LanguageMenu";
import UserMenu from "./UserMenu";

type HeaderProps = {
    title: string;
};

const Header = (props: HeaderProps) => {
    const { user, status } = useAuthState();

    return (
        <AppBar position="static" elevation={5}>
            <Box clone display="flex" flexDirection="row" alignItems="center">
                <Toolbar>
                    <Box flexGrow={1}>
                        <Typography variant="h3">{APP_NAME}</Typography>
                    </Box>
                    <div>
                        {status === "AUTHENTICATED" ? (
                            <UserMenu user={user!} />
                        ) : null}
                    </div>
                    <LanguageMenu />
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default Header;
