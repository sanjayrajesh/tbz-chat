import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(theme => ({
    root: {
        height: "100vh",
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        background: theme.palette.primary.main,
        padding: theme.spacing(10),
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing(4),
        background: 'purple'
    }
}));

const TestPage = () => {

    const classes = useStyle();

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                Header
            </header>
            <main className={classes.content}>

            </main>
        </div>
    )
}

export default TestPage
