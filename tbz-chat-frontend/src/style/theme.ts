import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export type Variant = "light" | "dark";

const createTheme = (variant: Variant) =>
    responsiveFontSizes(
        createMuiTheme({
            palette: {
                type: variant,

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
                        "body": {
                            backgroundColor: variant === "dark" ? grey["A400"] : grey[300]
                        }
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
                },
                MuiListItem: {
                    root: {
                        "&$selected": {
                            backgroundColor: variant === "dark" ? grey[700] : grey[300]
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
