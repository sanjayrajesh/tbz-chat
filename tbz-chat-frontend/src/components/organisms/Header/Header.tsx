import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuthState from "../../../util/hooks/useAuthState";
import UserButtons from "./UserButtons";
import UserMenu from "./UserMenu";

const APP_NAME = "TBZ Chat";

type HeaderProps = {
  title: string;
};

const useStyle = makeStyles((theme) => ({
  root: {},
}));

const Header = (props: HeaderProps) => {
  const { title } = props;

  const classes = useStyle();
  const { user, status } = useAuthState();

  useEffect(() => {
    document.title = APP_NAME + " | " + title;
  }, [title]);

  return (
    <AppBar className={classes.root} position="static" elevation={5}>
      <Toolbar>
        <Typography variant="h3">{APP_NAME}</Typography>
        {status === 'AUTHENTICATED' ? (
          <UserButtons user={user!} />
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
