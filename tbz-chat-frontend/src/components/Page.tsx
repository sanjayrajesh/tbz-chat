import { Box, Container } from "@material-ui/core";
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

const Page = (props: PageProps) => {
    const { title, children } = props;

    useEffect(() => {
        setPageTitle(title)
    }, [title]);

    return (
        <div className={"page"}>
            <Container maxWidth="lg">
                <Box height="100vh" py={4}>
                    <Box height={1}>
                        <Box margin={0} height={64}>
                            <Header title={title} />
                        </Box>
                        <Box component="main" position="relative" height="calc(100% - 64px)">{children}</Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Page;
