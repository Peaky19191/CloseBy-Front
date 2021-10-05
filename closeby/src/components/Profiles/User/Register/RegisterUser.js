import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../../actions/Profiles/user";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField, FormHelperText, FormControl } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const Register = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [errors, setErrors] = useState({});
    //const [btnDisabled, setBtnDisabled] = useState(true);

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

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };
    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };
    const onChangeGender = (e) => {
        const gender = e.target.value;
        setGender(gender);
    };
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
        setSuccessful(false);
        if (validate())
            window.alert('testing...')
            dispatch(registerUser(firstName, lastName, gender, email, password))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
       
    };

    const validate = () => {
        let temp = {}
        temp.firstName = firstName ? "" : "This field is required (First name)"
        temp.lastName = lastName ? "" : "This field is required (Last name)"
        temp.email = (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid" 
        temp.gender = gender.length != 0 ? "" : "This field is required (gender)"
        temp.password = (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/).test(password) ? "" : "At least 6 characters required including one number and one special character"
        setErrors({
            ...temp
        })

        return Object.values(temp).every( x => x == "");
    }

    const enabled = 
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        gender.length > 0 &&
        password.length > 0;

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully registered your account</strong>
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
                            <TextField label="First Name"
                                error={errors.firstName} helperText={(errors.firstName)} name="firstName" htmlFor="firstName" variant="outlined" fullWidth value={firstName} onChange={onChangeFirstName} type="text" autoFocus />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Last Name"
                                error={errors.lastName} helperText={(errors.lastName)} name="lastName" htmlFor="lastName" variant="outlined" fullWidth value={lastName} onChange={onChangeLastName} type="text" />
                        </Grid>
                        
                        <Grid item xs={12} >
                            <TextField label="Gender"
                                error={errors.gender} helperText={(errors.gender)} name="gender" htmlFor="gender" variant="outlined" fullWidth value={gender} onChange={onChangeGender} type="text" select label="Gender">
                                <MenuItem value={"Male"} >Male</MenuItem>
                                <MenuItem value={"Female"} >Female</MenuItem>
                            </TextField>
                        </Grid>
           
                        <Grid item xs={12} >
                            <TextField label="Email Address"
                                error={errors.email} helperText={(errors.email)} name="email" htmlFor="email" variant="outlined" fullWidth value={email} onChange={onChangeEmail}  />
                        </Grid>
                        
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
                                }}
                                fullWidth error={errors.password} helperText={(errors.password)} ame="password" htmlFor="password" type="password" label="Password" value={password} onChange={onChangePassword} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} variant="outlined" />
                        </Grid>
                    </Grid>
                    <Button disabled={!enabled} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
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
