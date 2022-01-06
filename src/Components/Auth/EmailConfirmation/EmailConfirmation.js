import { Typography } from '@material-ui/core';
import { confirmUserEmail } from '../../../Actions/auth';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Avatar, Button, Paper, Container } from '@material-ui/core';
import useStyles from './styles';
import EmailIcon from '@mui/icons-material/Email'; import { Alert, AlertTitle } from '@material-ui/lab';
import { useParams } from 'react-router';


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
    }, [])

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