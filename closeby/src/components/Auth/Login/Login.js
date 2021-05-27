import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../../../actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../Input'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { AUTH } from '../../../constants/actionTypes'
import Icon from '../icon';
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';

const initialState = { email: '', password: '' };

const Login = () => {
    const classes = useStyles();
    const history = useHistory();

    const [form, setForm] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form, history));
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return (
        <Container component="main" maxWidth="xs">
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
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus half />
                        <Input Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} half />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Login
                    </Button>
                    <GoogleLogin
                        clientId="1057934852749-l14q86dick3e4rpd15gntfqcp6l4kl55.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} startIcon={<Icon />} variant="contained">
                                Google Login
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button component={Link} to="/register">
                                Don't have an account? Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
export default Login;