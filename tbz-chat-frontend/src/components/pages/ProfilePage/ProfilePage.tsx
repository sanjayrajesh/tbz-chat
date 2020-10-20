import {
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import useLanguage from "../../../util/hooks/useLanguage";
import Paper from "../../atoms/Paper";
import Page from "../../Page";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

const ProfilePage = () => {
    const getString = useLanguage();
    const history = useHistory();

    return (
        <Page title={getString("profile")}>
            <Box clone height={1} width={1}>
                <Paper square>
                    <Container maxWidth="sm">
                        <Grid container spacing={2}>
                            <Grid item xs={12} container spacing={2} alignItems="center">
                                <Grid item>
                                    <IconButton onClick={history.goBack}>
                                        <BackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">
                                        {getString("profile")}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <ProfileForm />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} >
                                <PasswordForm />
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Box>
        </Page>
    );
};

export default ProfilePage;
