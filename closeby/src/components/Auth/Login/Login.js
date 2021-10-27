import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../../../actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
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
                props.history.push("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    };

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
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
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email"
                                name="email" htmlFor="email" type="email" variant="outlined" fullWidth onChange={onChangeEmail} value={email} autoFocus half item />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                {!showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                name="password" htmlFor="password" type="password" label="Password" value={password} onChange={onChangePassword} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} fullWidth variant="outlined" half item />
                        </Grid>
                    </Grid>
                    <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit} disabled={loading}>
                        {loading && (
                            <CircularProgress size="20px" />
                        )}
                        Login
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Typography variant="button" display="block">Don't have an account?
                                <Button component={Link} to="/register" className={classes.bottomButton}>
                                    Register
                                </Button>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="button" display="block">Forgot the password?
                                <Button component={Link} to="/resetPassword" className={classes.bottomButton}>
                                    Click Here
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </Container>
    );
}
export default Login;