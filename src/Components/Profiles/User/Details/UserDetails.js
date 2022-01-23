import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import useStyles from './styles';

const UserDetails = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user.user);

    // eslint-disable-next-line
    const [firstName, setFirstName] = useState(user.firstName);
    // eslint-disable-next-line
    const [lastName, setLastName] = useState(user.lastName);
    // eslint-disable-next-line
    const [email, setEmail] = useState(user.email);
    // eslint-disable-next-line
    const [gender, setGender] = useState(user.gender);
    // eslint-disable-next-line
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
                        <Button className={classes.buttonCompanyDetails} component={Link} to="/eventTicketsList" fullWidth variant="contained" color="primary" >
                            Tickets
                        </Button>
                        <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                            back
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default UserDetails;


