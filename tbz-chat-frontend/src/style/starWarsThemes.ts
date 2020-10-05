import { createMuiTheme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import stars from "../images/stars.jpg";

const createStarWarsTheme = (main: string, light: string) => {
    const glowFont: CSSProperties = {
        textShadow: `0 0 10px ${main}, 0 0 20px ${main}, 0 0 30px ${main}, 0 0 40px ${main}, 0 0 50px ${main}`,
        color: light,
    };

    const primary = "#08070d";

    const glowBottomBorder: CSSProperties = {
        border: "none",
        boxShadow: `0 0 1px 1px ${light}, 0 0 5px 2px ${main}`,
        transition: "none",
    };

    const glowBottomBorderFocused: CSSProperties = {
        border: "none",
        boxShadow: `0 0 1px 1px ${light}, 0 0 10px 5px ${main}`,
        transition: "none",
    };

    return createMuiTheme({
        palette: {
            primary: {
                main: primary,
                contrastText: light,
            },
            secondary: {
                main: main,
                light: light,
                contrastText: light,
            },
            type: "dark",
            background: {
                paper: "#292828",
            },
        },
        typography: {
            fontFamily: "Droid Sans, sans-serif",
            allVariants: glowFont,
        },
        props: {
            MuiTextField: {
                color: "primary",
                autoComplete: "off",
            },
            MuiIconButton: {
                //color: 'secondary'
            },
        },
        overrides: {
            MuiPaper: {
                root: {
                    opacity: 0.8,
                },
            },
            MuiTextField: {
                root: {
                    "& .Mui-focused": {
                        color: light,
                        "&:after": glowBottomBorderFocused,
                    },
                    "& .MuiInput-underline:after": glowBottomBorder,
                    "& .MuiInput-underline:before": {
                        ...glowBottomBorder,
                        height: 0,
                    },
                    "& .MuiInput-underline:hover:before": {
                        border: "none",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-focused):before": {
                        ...glowBottomBorderFocused,
                    },
                },
            },
            MuiListItemIcon: {
                root: {
                    minWidth: 0,
                    marginRight: "4px",
                    color: light,
                    position: "relative",
                    zIndex: 1,
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        borderRadius: "50%",
                        boxShadow: `0 0 24px 12px ${main}`,
                        zIndex: -1,
                    },
                },
            },
            MuiIconButton: {
                root: {
                    color: light,
                    position: "relative",
                    "&:hover": {
                        backgroundColor: "none",
                        position: "relative",
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            borderRadius: "50%",
                            boxShadow: `0 0 24px 18px ${main}`,
                            zIndex: -1,
                        },
                    },
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        borderRadius: "50%",
                        boxShadow: `0 0 24px 12px ${main}`,
                        zIndex: -1,
                    },
                },
            },
            MuiCssBaseline: {
                "@global": {
                    ".page": {
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
                    paddingBottom: "32px",
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
                colorPrimary: {
                    backgroundColor: "transparent"
                }
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
                },
            },
        },
    });
};

const starWarsThemes = {
    dark: createStarWarsTheme("#c70400", "#eeffff"),
    light: createStarWarsTheme("#1c85fb", "#ffffff"),
};

export default starWarsThemes;
