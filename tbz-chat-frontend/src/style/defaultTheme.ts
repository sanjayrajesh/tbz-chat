import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let defaultTheme = createMuiTheme({
    palette: {
        type: 'dark'
    },
    overrides: {
        MuiLink: {
            root: {
                cursor: "pointer"
            }
        },
        MuiCssBaseline: {
            "@global": {
                "::-webkit-scrollbar": {
                    width: "8px",
                },
                "::-webkit-scrollbar-track": {
                    background: "transparent"
                },
                "::-webkit-scrollbar-thumb": {
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "4px",
                },
            }
        }
    }
});

defaultTheme = responsiveFontSizes(defaultTheme);

export default defaultTheme