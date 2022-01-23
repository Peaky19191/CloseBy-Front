import { Avatar, Button, Container, Paper, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import EmailIcon from '@mui/icons-material/Email';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { confirmUserEmail } from '../../../Actions/auth';
import useStyles from './styles';


const EmailConfirmation = () => {
    const classes = useStyles();
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const { token } = useParams();

    useEffect(() => {
        dispatch(confirmUserEmail(token))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <EmailIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Email confirmation</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully confirmed your email!</strong>
                    </Alert>
                    :
                    (message ?
                        <Alert className={successful ? classes.alert : classes.alert} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong> {message} </strong>
                        </Alert>
                        :
                        null
                    )
                }
                <Button component={Link} to="/login" variant="contained" color="primary">
                    Login
                </Button>
            </Paper>
        </Container>
    );
}

export default EmailConfirmation; 