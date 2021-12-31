import React from "react";
import useStyles from './styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from "react-redux";

const Message = () => {
    const classes = useStyles();
    const { status } = useSelector(state => state.message);
    const { message } = useSelector(state => state.message);
    return (
        <>
            {(status === "success") ?
                <Alert className={classes.alert} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    <strong>{message}</strong>
                </Alert>
                :
                <Alert className={classes.alert} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong> {message}</strong>
                </Alert>
            }
        </>
    );
};
export default Message;
