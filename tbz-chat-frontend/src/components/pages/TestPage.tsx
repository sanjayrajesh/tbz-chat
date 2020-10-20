import { Grid, Typography, useTheme } from '@material-ui/core'
import React from 'react'

const TestPage = () => {

    const theme = useTheme();

    return (
        <div style={{padding: theme.spacing(4)}}>
            <Grid container spacing={3}>
            {Object.entries(theme.palette.grey).map(([key, value]) => (
                <Grid item>
                    <Typography style={{background: value, height: "200px", width: "200px"}}>
                        {key}
                    </Typography>
                </Grid>
            ))}
        </Grid>
        <Grid container spacing={3}>
            {Object.entries(theme.palette.grey).reverse().map(([key, value]) => (
                <Grid item xs={3}>
                    <Typography style={{background: value, height: "200px", width: "200px", color: "orange"}}>
                        {key}
                    </Typography>
                </Grid>
            ))}
        </Grid>
        </div>
    )
}

export default TestPage

/*

50: "#fafafa"
100: "#f5f5f5"
200: "#eeeeee"
300: "#e0e0e0"
400: "#bdbdbd"
500: "#9e9e9e"
600: "#757575"
700: "#616161"
800: "#424242"
900: "#212121"
A100: "#d5d5d5"
A200: "#aaaaaa"
A400: "#303030"
A700: "#616161"


*/
