import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
    palette: {
        type: 'light'
    },
    overrides: {
        MuiLink: {
            root: {
                cursor: "pointer"
            }
        }
    }
});

export default defaultTheme;