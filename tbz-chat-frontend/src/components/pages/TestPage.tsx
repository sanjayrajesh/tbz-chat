import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import Button from "../atoms/Button";
import StyledTextField from "../atoms/input/StyledTextField";

const TestPage = () => {
    return (
        <Container>
            <Box p={4}>
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <StyledTextField label={"Standard"} />
                    </Grid>
                    <Grid item>
                        <StyledTextField disabled label={"Disabled"} />
                    </Grid>
                    <Grid item>
                        <StyledTextField
                            readOnly
                            value="Readonly"
                            label={"Readonly"}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Enabled
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" disabled>
                            Disabled
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="text" color="primary">
                            Enabled
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="text" color="primary" disabled>
                            Disabled
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                            Enabled
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" disabled>
                            Disabled
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default TestPage;
