import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { regCompAdmin } from "../../../../Actions/Profiles/companyAdmin";
import { Alert, AlertTitle } from '@material-ui/lab';

const RegCompAdmin = () => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    const [successful, setSuccessful] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        dispatch(regCompAdmin(firstName, lastName, gender, email))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register Customer Admin</Typography>
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
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="First Name" name="firstName" htmlFor="firstName" variant="outlined" type="text" value={firstName} onChange={onChangeFirstName} fullWidth autoFocus />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Last Name" name="lastName" htmlFor="lastName" variant="outlined" type="text" value={lastName} onChange={onChangeLastName} fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Email Address" name="email" htmlFor="email" variant="outlined" type="email" value={email} onChange={onChangeEmail} fullWidth />
                        </Grid>
                        <InputLabel className={classes.select} id="selectLabel">Select your gender</InputLabel>
                        <Select className={classes.select} name="gender" labelId="selectLabel" value={gender} onChange={onChangeGender} open={open} onClose={handleClose} onOpen={handleOpen} type="text" variant="outlined" fullWidth>
                            <MenuItem value="Male" >Male</MenuItem>
                            <MenuItem value="Female" >Female</MenuItem>
                        </Select>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Register Customer Admin
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default RegCompAdmin;
