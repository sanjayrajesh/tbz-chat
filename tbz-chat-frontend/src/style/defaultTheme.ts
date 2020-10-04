import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
    overrides: {
        MuiLink: {
            root: {
                cursor: "pointer"
            }
        }
    }
});

export default defaultTheme;