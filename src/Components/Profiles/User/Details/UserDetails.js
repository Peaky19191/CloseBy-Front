import React, { useState, useEffect } from "react";
import useStyles from './styles';
import { getUserIdDispatch } from '../../../../Actions/Profiles/user';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserDetails = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user.user);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(user.gender);

    const [disaled, setDisabled] = useState(true);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Details of the User</Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField value={firstName} label="First Name" InputProps={{ readOnly: disaled }} name="firstName" htmlFor="firstName" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={lastName} InputProps={{ readOnly: disaled }} name="lastName" htmlFor="lastName" variant="outlined" fullWidth label="Last Name" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={email} label="Email Address" InputProps={{ readOnly: disaled }} name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={gender} htmlFor="gender" variant="outlined" InputProps={{ readOnly: disaled }} fullWidth type="text" label="Gender" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} spacing={2}>
                        <Button className={classes.buttonCompanyDetails} onClick={() => { }} fullWidth variant="contained" color="primary" >
                            Tickets
                        </Button>
                        <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default UserDetails;


