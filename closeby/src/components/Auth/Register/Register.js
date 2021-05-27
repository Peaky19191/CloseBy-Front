import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { register } from "../../../actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, Select } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../Input'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { AUTH } from '../../../constants/actionTypes'
import Icon from '../icon';
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const initialState = { firstName: '', lastName: '', gender: '', email: '', password: '' };

export const Register = () => {
    const classes = useStyles();
    const history = useHistory();

    const [form, setForm] = useState(initialState);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form, history));
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register</Typography>
                {message && (
                    <Alert className={classes.alert} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong> {message}</strong>
                    </Alert>
                )}
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Input name="firstName" label="First Name" handleChange={handleChange} type="text" autoFocus />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} type="text" />
                        <InputLabel className={classes.select} id="selectLabel"   >Select your gender</InputLabel>
                        <Select className={classes.select} name="gender" labelId="selectLabel" open={open} onClose={handleClose} onOpen={handleOpen} onChange={handleChange} type="text" variant="outlined" fullWidth>
                            <MenuItem value="Male" >Male</MenuItem>
                            <MenuItem value="Female" >Female</MenuItem>
                        </Select>
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus />
                        <Input Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button component={Link} to="/auth">
                                Already have an account? Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Register;
