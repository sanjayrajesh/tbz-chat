import { Box, Container } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Form, Formik } from "formik";
import React from "react";
import User from "../../models/User";
import StyledTextField from "../atoms/input/StyledTextField";
import UserSelect from "../molecules/UserSelect/UserSelect";

type Values = {
    users: User[];
}

const initialValues: Values = {
    users: []
}

const TestPage = () => {

    const handleSubmit = (values: Values) => {
        console.log(values);
        alert("submitted");
    }

    return (
        <Container>
            <Box p={4}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <UserSelect name="users" label="Users" placeholder={"Search user"} />
                    </Form>
                </Formik>
                <Box mt={4}>
                    <Autocomplete
                        options={["a", "b", "c"]}
                        renderInput={params => <StyledTextField {...params} />}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default TestPage;
