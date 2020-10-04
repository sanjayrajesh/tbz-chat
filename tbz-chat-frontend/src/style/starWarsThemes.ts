import { createMuiTheme } from "@material-ui/core";
import stars from "../images/stars.jpg";

const createStarWarsTheme = (main: string, light: string) =>
    createMuiTheme({
        palette: {
            primary: {
                main: "#08070d",
            },
            secondary: {
                main: main,
                light: light,
            },
        },
        typography: {
            fontFamily: "Droid Sans, sans-serif",
            allVariants: {
                textShadow: `0 0 10px ${main}, 0 0 20px ${main}, 0 0 30px ${main}, 0 0 40px ${main}, 0 0 50px ${main}`,
                color: light,
            },
        },
        overrides: {
            MuiCssBaseline: {
                "@global": {
                    ".page": {
                        width: "100vw",
                        height: "100vh",
                        position: "relative",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${stars})`,
                            filter: "brightness(50%)",
                        },
                    },
                },
            },
            MuiAppBar: {
                root: {
                    "&>div": {
                        background: "none",
                        position: "relative",
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-4px",
                            left: 0,
                            width: "100%",
                            boxShadow: `0 0 2.5px 1px ${light}, 0 0 20px 10px ${main}`,
                        },
                    },
                },
            },
            MuiLink: {
                root: {
                    color: light,
                    cursor: "pointer",
                },
                underlineAlways: {
                    position: "relative",
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-4px",
                        left: 0,
                        width: "100%",
                        boxShadow: `0 0 1px 1px ${light}, 0 0 5px 2.5px ${main}`,
                    },
                    textDecoration: "none",
                },
                underlineHover: {
                    "&:hover": {
                        textDecoration: "none",
                        position: "relative",
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-4px",
                            left: 0,
                            width: "100%",
                            boxShadow: `0 0 1px 1px ${light}, 0 0 5px 2.5px ${main}`,
                        },
                    },
                }
            },
        },
    });

const starWarsThemes = {
    dark: createStarWarsTheme("#c70400", "#eeffff"),
    light: createStarWarsTheme("#1c85fb", "#ffffff"),
};

export default starWarsThemes;
