import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../../../Actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, Box, FormControlLabel, CssBaseline } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from "react-validation/build/form";
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Login = (props) => {
    const classes = useStyles();

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
                props.history.push("/events");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Redirect to="/events" />;
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