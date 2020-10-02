import { Grid, makeStyles } from '@material-ui/core'
import React, { ReactNode } from 'react'

type CenterProps = {
    children: ReactNode
}

const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    }
}));

const Center = (props: CenterProps) => {

    const classes = useStyle();

    return (
        <Grid container justify="center" alignContent="center" alignItems="center" className={classes.root} >
            {props.children}
        </Grid>
    )
}

export default Center
