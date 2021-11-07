import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../../../Actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useParams } from 'react-router';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export const NewPassword = () => {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [errors, setErrors] = useState({});

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const enabled = password.length > 0;

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeConfirmPassword = (e) => {
        const confirm_password = e.target.value;
        setConfirmPassword(confirm_password);
    };

    const { token } = useParams();
    //console.log(token);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        console.log(token);
        if (validate())
            dispatch(setNewPassword(password, token))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
    };

    const validate = () => {
        let temp = {}
        temp.password = (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*ąćęłńóśźżĄĘŁŃÓŚŹŻ]{6,50}$/).test(password) ? "" : "At least 6 characters required including one number and one special character"
        temp.confirm_password = confirm_password == password ? "" : "Passwords are not the same"
        setErrors({
            ...temp
        })
        console.log(Object.values(temp).every(x => x == ""));
        return Object.values(temp).every(x => x == "");
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Set new password</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully set your new password.
                            Now you can login!</strong>
                    </Alert>
                    :
                    (message ?
                        <Alert className={successful ? classes.alert : classes.alert} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong> {message}</strong>
                        </Alert>
                        :
                        null
                    )
                }
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                {!showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} error={errors.password} helperText={(errors.password)} label="Password" name="password" htmlFor="password" type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} variant="outlined" fullWidth value={password} onChange={onChangePassword} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField disabled={!enabled}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowConfirmPassword}>
                                                {!showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} type={showConfirmPassword ? 'text' : 'password'} handleShowConfirmPassword={handleShowConfirmPassword} variant="outlined" fullWidth value={confirm_password} error={errors.confirm_password} helperText={(errors.confirm_password)} label="Confirm password" name="confirm_password" htmlFor="confirm_password" variant="outlined" fullWidth value={confirm_password} onChange={onChangeConfirmPassword} />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Set new password
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

export default NewPassword;
