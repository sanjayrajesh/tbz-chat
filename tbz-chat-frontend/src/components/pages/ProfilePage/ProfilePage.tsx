import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import useAuthState from "../../../util/hooks/useAuthState";
import useLanguage from "../../../util/hooks/useLanguage";
import Paper from "../../atoms/Paper";
import Page from "../../Page";
import BackIcon from '@material-ui/icons/ArrowBack';
import StyledTextField from "../../atoms/input/StyledTextField";

const ProfilePage = () => {
    const { user } = useAuthState();
    const getString = useLanguage();
    const history = useHistory();

    return (
        <Page title={getString("profile")}>
            <Box clone height={1} width={1}>
                <Paper square>
                    <Container maxWidth="sm">
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Button startIcon={<BackIcon />} onClick={history.goBack}>
                                    {getString("back")}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    {getString("my.profile")}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <StyledTextField readOnly value={user!.email} label={getString("email")} />
                            </Grid>
                            <Grid item>
                                <StyledTextField value={user!.username} label={getString("username")} />
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Box>
        </Page>
    );
};

export default ProfilePage;
