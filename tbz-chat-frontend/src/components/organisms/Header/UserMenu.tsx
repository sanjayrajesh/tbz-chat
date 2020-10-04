import React, { useCallback, useState } from 'react'
import User from '../../../models/User'
import useLanguage from '../../../util/hooks/useLanguage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ListItemText, makeStyles, Menu, MenuItem, Button } from '@material-ui/core';
import useThunkDispatch from '../../../util/hooks/useThunkDispatch';
import { logout } from '../../../redux/auth/authActions';
import { useHistory } from 'react-router-dom';

type UserMenuProps = {
    user: User
}

const useStyle = makeStyles(theme => ({
    logoutIcon: {
        transform: 'rotate(180deg)'
    },
    button: {
        color: theme.palette.primary.contrastText,
        textTransform: 'none'
    }
}));

const UserMenu = (props: UserMenuProps) => {

    const {user} = props;
    const getString = useLanguage();
    const dispatch = useThunkDispatch();
    const history = useHistory();
    const classes = useStyle();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = useCallback((e: any) => setAnchorEl(e.currentTarget), []);
    const handleClose = useCallback(() => setAnchorEl(null), []);

    const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
    const handleProfile = useCallback(() => history.push("/profile"), [history]);

    return (
        <div>
            <Button className={classes.button} onClick={handleOpen} endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />} >
                {user.username || user.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                keepMounted
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
            >
                <MenuItem button onClick={handleProfile}>
                    <AccountCircleIcon fontSize="small" />
                    <ListItemText primary={getString("profile")} />
                </MenuItem>
                <MenuItem button onClick={handleLogout}>
                    <ExitToAppIcon className={classes.logoutIcon} fontSize="small" />
                    <ListItemText primary={getString("logout")} />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu
