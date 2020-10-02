import React from "react";
import {
  makeStyles,
  Paper as MuiPaper,
  PaperProps as MuiPaperProps,
  Typography,
} from "@material-ui/core";

type PaperProps = MuiPaperProps;

const useStyle = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.width("sm") * 0.75,
    padding: theme.spacing(4),
  },
  title: {
      fontWeight: theme.typography.fontWeightMedium,
  }
}));

const Paper = (props: PaperProps) => {
  const classes = useStyle();
  const { children, title, ...rest } = props;

  return (
    <MuiPaper {...rest} className={classes.root}>
      {title ? (
        <Typography className={classes.title} variant="h5" gutterBottom>
          {title}
        </Typography>
      ) : null}
      {children}
    </MuiPaper>
  );
};

Paper.defaultProps = {
  elevation: 5,
};

export default Paper;
