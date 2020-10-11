import { Container, makeStyles } from "@material-ui/core";
import React, { ReactNode, useEffect } from "react";
import Header from "./organisms/Header/Header";

export const APP_NAME = "TBZ Chat";

export const setPageTitle = (title: string) => {
    document.title = APP_NAME + " | " + title; 
}

type PageProps = {
    title: string;
    children: ReactNode;
};

const useStyle = makeStyles((theme) => ({
    root: {
        height: "100vh",
        padding: theme.spacing(4, 0)
    },
    pageWrapper: {
        height: "100%",
    },
    header: {
        margin: 0,
        height: "64px"
    },
    content: {
        position: "relative",
        height: "calc(100% - 64px)"
    },
}));

const Page = (props: PageProps) => {
    const { title, children } = props;
    const classes = useStyle();

    useEffect(() => {
        setPageTitle(title)
    }, [title]);

    return (
        <div className={"page"}>
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <div className={classes.pageWrapper}>
                        <div className={classes.header}>
                            <Header title={title} />
                        </div>
                        <main className={classes.content}>{children}</main>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Page;
