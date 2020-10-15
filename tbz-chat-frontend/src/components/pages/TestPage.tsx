import { Box, Container } from "@material-ui/core";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect } from "react";
import User from "../../models/User";
import UserSelect from "../molecules/UserSelect/UserSelect";

type Values = {
    users: User[];
};

const initialValues: Values = {
    users: [],
};

const FormikContent = (props: FormikProps<Values>) => {

    const {values: {users}} = props;

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <Form>
            <UserSelect name="users" label="Users" />
        </Form>
    );
};

const TestPage = () => {

    const handleSubmit = () => {}

    return (
        <Container>
            <Box p={4}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {props => <FormikContent {...props} />}
                </Formik>
            </Box>
        </Container>
    );
};

export default TestPage;
