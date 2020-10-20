import React, { useCallback, useState } from "react";
import User from "../../../models/User";
import useLanguage from "../../../util/hooks/useLanguage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    Button,
    Grid,
    ListItemIcon,
} from "@material-ui/core";
import useThunkDispatch from "../../../util/hooks/useThunkDispatch";
import { logout } from "../../../redux/auth/authActions";
import { useHistory } from "react-router-dom";

type UserMenuProps = {
    user: User;
};

const useStyle = makeStyles((theme) => ({
    logoutIcon: {
        transform: "rotate(180deg)",
    },
    button: {
        color: theme.palette.primary.contrastText,
        textTransform: "none",
        fontSize: theme.typography.h6.fontSize,
        "&:hover": {
            background: "none"
        },
        fontWeight: theme.typography.fontWeightRegular,
        padding: 0
    },
}));

const UserMenu = (props: UserMenuProps) => {
    const { user } = props;
    const getString = useLanguage();
    const dispatch = useThunkDispatch();
    const history = useHistory();
    const classes = useStyle();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = useCallback(
        (e: any) => setAnchorEl(e.currentTarget),
        []
    );
    const handleClose = useCallback(() => setAnchorEl(null), []);

    const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
    const handleProfile = useCallback(() => history.push("/profile"), [
        history,
    ]);

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item>
                <Button
                    className={classes.button}
                    onClick={handleOpen}
                    endIcon={
                        anchorEl ? (
                            <ExpandLessIcon fontSize="large" />
                        ) : (
                            <ExpandMoreIcon fontSize="large" />
                        )
                    }
                >
                    {user.username || user.email}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    keepMounted
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom",
                    }}
                >
                    <MenuItem onClick={handleProfile}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={getString("profile")} />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon
                                className={classes.logoutIcon}
                                fontSize="small"
                            />
                        </ListItemIcon>
                        <ListItemText primary={getString("sign.out")} />
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};

export default UserMenu;
