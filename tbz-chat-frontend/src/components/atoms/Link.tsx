import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';

type LinkProps = Omit<MuiLinkProps, 'href'> & {
    to?: string,
    active?: boolean,
    onClick?: () => void
}

const Link = (props: LinkProps) => {

    const {to, onClick, className, active, underline, ...rest} = props;
    const history = useHistory();

    const handleClick = useCallback((e: any) => {
        e.preventDefault();
        if(onClick) {
            onClick();
        } else if(to) {
            history.push(to)
        }
    }, [onClick, to, history]);

    return (
        <MuiLink href={!onClick ? to : undefined} onClick={handleClick} underline={active ? 'always' : underline} {...rest} />
    )

}

Link.defaultProps = {
    variant: 'body1'
} as LinkProps

export default Link
