import { Avatar, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import { login } from "../../../Actions/auth";
import useStyles from './styles';

const Login = (props) => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        dispatch(login(email, password))
            .then(() => {
                if (currentProfile.role === "User") {
                    props.history.push("/events");
                }
                props.history.push("/eventList");

                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        if (currentProfile.role === "User") {
            return <Redirect to="/events" />;
        }
        return <Redirect to="/eventList" />;
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Login</Typography>
                {message && (
                    <Alert className={classes.alert} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong> {message}</strong>
                    </Alert>
                )}
                <Form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid className={classes.textField} item xs={12} >
                            <TextField label="Email" name="email" htmlFor="email" type="email" variant="outlined" fullWidth onChange={onChangeEmail} value={email} autoFocus item />
                        </Grid>
                        <Grid className={classes.textField} item xs={12} >
                            <TextField InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword}>
                                            {!showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                                fullWidth name="password" htmlFor="password" type="password" label="Password" value={password} onChange={onChangePassword} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} variant="outlined" item />
                        </Grid>
                    </Grid>
                    <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit} disabled={loading}>
                        {loading ? (
                            <CircularProgress size="20px" />
                        ) : "Login"}
                    </Button>
                </Form>
                <Grid container>
                    <Grid item xs>
                        <Link to="/resetPassword" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/register" variant="body2">
                            {"Don't have an account? Register"}
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
export default Login;