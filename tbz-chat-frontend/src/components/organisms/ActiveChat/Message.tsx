import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { Moment } from "moment";
import React from "react";
import useAuthState from "../../../util/hooks/useAuthState";

const useStyle = makeStyles((theme) => ({
    root: (isOwn: boolean) => ({
        display: "flex",
        flexDirection: isOwn ? "row-reverse" : "row",
        "&:not(:last-child)": {
            marginBottom: theme.spacing(3),
        },
    }),
    content: (isOwn: boolean) => ({
        maxWidth: "65%",
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        background: isOwn
            ? theme.palette.success.dark
            : theme.palette.info.main,
    }),
    authorName: {
        fontWeight: theme.typography.fontWeightBold,
    },
    timestamp: {
        textAlign: "right",
    },
    body: {
        whiteSpace: "pre-wrap",
    },
}));

type MessageProps = {
    message: {
        body: string;
        authorName: string;
        timestamp: Moment;
        authorId: string;
    };
};

const Message = (props: MessageProps) => {
    const {
        message: { body, authorName, timestamp, authorId },
    } = props;
    const { user } = useAuthState();
    const isOwn = user!.id === authorId;
    const classes = useStyle(isOwn);

    return (
        <div className={clsx(classes.root)}>
            <div className={classes.content}>
                {!isOwn ? (
                    <Typography className={classes.authorName}>
                        {authorName}
                    </Typography>
                ) : null}
                {body.split("\n").map((line, index) => (
                    <Typography key={index} className={classes.body}>{line}</Typography>
                ))}
                <Typography color="textSecondary" className={classes.timestamp}>
                    {timestamp.format("HH:mm")}
                </Typography>
            </div>
        </div>
    );
};

export default Message;
