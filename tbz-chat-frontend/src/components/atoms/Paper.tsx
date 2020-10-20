import React from "react";
import {
  makeStyles,
  Paper as MuiPaper,
  PaperProps as MuiPaperProps,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";

type PaperProps = MuiPaperProps & {
  padding?: number
}

const useStyle = makeStyles((theme) => ({
  root: {
    padding: (props: PaperProps) => theme.spacing(props.padding!),
    background: theme.palette.type === "dark" ? theme.palette.grey[800] : theme.palette.common.white
  },
  title: {
      fontWeight: theme.typography.fontWeightMedium,
  }
}), { name: "Paper"});

const Paper = (props: PaperProps) => {
  const classes = useStyle(props);
  const { children, title, className, ...rest } = props;

  return (
    <MuiPaper {...rest} className={clsx(classes.root, className)}>
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
  padding: 4
} as PaperProps;

export default Paper;
