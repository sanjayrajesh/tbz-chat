import { Container, makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import Header from "./organisms/Header/Header";

type PageProps = {
    title: string;
    children: ReactNode;
};

const HEADER_HEIGHT = "80px";

const useStyle = makeStyles((theme) => ({
    header: {
        height: HEADER_HEIGHT,
    },
    contentWrapper: {},
    content: {
        position: "relative",
        height: `calc(100vh - ${HEADER_HEIGHT} - 2*${theme.spacing(4)}px)`,
    },
}));

const Page = (props: PageProps) => {
    const { title, children } = props;
    const classes = useStyle();

    return (
        <div className={"page"}>
            <Container maxWidth="md">
                <div className={classes.header}>
                    <Header title={title} />
                </div>
                <div className={classes.contentWrapper}>
                    <main className={classes.content}>{children}</main>
                </div>
            </Container>
        </div>
    );
};

export default Page;
