import { Box } from '@material-ui/core'
import React, { ReactNode } from 'react'

type CenterProps = {
    children: ReactNode
}

const Center = (props: CenterProps) => {

    return (
        <Box display="flex" flexWrap="wrap" boxSizing="border-box" flexDirection="row" justifyContent="center" alignContent="center" alignItems="center" width={1} height={1} >
            {props.children}
        </Box>
    )
}

export default Center
