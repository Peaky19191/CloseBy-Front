import React, { useState } from 'react';
import { useDispatch} from "react-redux";
import { setNewPassword } from "../../../Actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../../Message/Message';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const NewPassword = () => {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirm_password, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const enabled = password.length > 0;

    const { token } = useParams();

    const dispatch = useDispatch();

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeConfirmPassword = (e) => {
        const confirm_password = e.target.value;
        setConfirmPassword(confirm_password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(false);
        setLoading(true);

        if (validate())
        dispatch(setNewPassword(password, token))
        .then(() => {
            setShowMessage(true);
            setLoading(false);

        })
        .catch(() => {
            setShowMessage(true);
            setLoading(false);

        });
    };

    const validate = () => {
        let temp = {}
        temp.password = (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*ąćęłńóśźżĄĘŁŃÓŚŹŻ]{6,50}$/).test(password) ? "" : "At least 6 characters required including one number and one special character"
        temp.confirm_password = confirm_password == password ? "" : "Passwords are not the same"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "");
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Set New Password</Typography>
                {showMessage &&
                    <Message />
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
                        {loading ? (
                            <CircularProgress size="20px" />
                        ) : "Set new password"}
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
