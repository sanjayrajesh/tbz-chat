import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const createTheme = (type: "light" | "dark") =>
    responsiveFontSizes(
        createMuiTheme({
            palette: {
                type: type,
            },
            props: {
                MuiDialog: {
                    fullWidth: true
                },
                MuiLink: {
                    color: "textPrimary"
                },
            },
            overrides: {
                MuiLink: {
                    root: {
                        cursor: "pointer",
                    },
                },
                MuiCssBaseline: {
                    "@global": {
                        "::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "::-webkit-scrollbar-track": {
                            background: "transparent",
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: "rgba(0, 0, 0, 0.2)",
                            borderRadius: "4px",
                        },
                    },
                },
                MuiDialog: {

                },
                MuiDialogContent: {
                    root: {
                        "&:first-child": {
                            paddingTop: "8px"
                        }
                    }
                },
                MuiDialogActions: {
                    root: {
                        padding: "8px 24px",
                        "& *": {
                            flex: 1
                        }
                    }
                }
            },
        })
    );

const defaultTheme = {
    light: createTheme("light"),
    dark: createTheme("dark")
}

export default defaultTheme;
