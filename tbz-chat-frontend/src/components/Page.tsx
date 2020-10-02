import { Container, Grid, makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import Header from "./organisms/Header/Header";

type PageProps = {
  title: string;
  children: ReactNode;
};

const HEADER_HEIGHT = "64px";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  header: {
    height: HEADER_HEIGHT,
  },
  contentWrapper: {
    height: `calc(100vh - ${HEADER_HEIGHT})`,
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const Page = (props: PageProps) => {
  const { title, children } = props;
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header title={title} />
      </div>
      <div className={classes.contentWrapper}>
        <Container maxWidth="lg">
          <main className={classes.content}>{children}</main>
        </Container>
      </div>
    </div>
  );
};

export default Page;
