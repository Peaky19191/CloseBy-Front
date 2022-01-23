import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../Actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../../Message/Message';


export const ResetPassword = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(false);
        setLoading(true);

        dispatch(resetPassword(email))
            .then(() => {
                setShowMessage(true);
                setLoading(false);

            })
            .catch(() => {
                setShowMessage(true);
                setLoading(false);

            });
    };

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Reset Password</Typography>
                {showMessage &&
                    <Message />
                }
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="Email Address" name="email" htmlFor="email" type="email" variant="outlined" fullWidth value={email} onChange={onChangeEmail} type="email" />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {loading ? (
                            <CircularProgress size="20px" />
                        ) : "Reset"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Return to the login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default ResetPassword;
