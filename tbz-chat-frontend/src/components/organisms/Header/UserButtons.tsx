import { Button, Typography } from '@material-ui/core'
import React from 'react'
import User from '../../../models/User'
import useLanguage from '../../../util/hooks/useLanguage'

type UserButtonsProps = {
    user: User
}

const UserButtons = (props: UserButtonsProps) => {

    const {user} = props;
    const getString = useLanguage();

    return (
        <div>
            <Typography>
                {user.username || user.email}
            </Typography>
            <Button>
                {getString("profile")}
            </Button>
            <Button>
                {getString("logout")}
            </Button>
        </div>
    )
}

export default UserButtons
