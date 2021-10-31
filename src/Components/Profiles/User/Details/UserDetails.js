import React, { useState, useEffect } from "react";
import useStyles from './styles';
import User from '../../../../Api/user'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';

const UserDetails = () => {
    const classes = useStyles();
    const userId = useSelector(state => state.profiles.id);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeGender = (e) => {
        const gender = e.target.value;
        setGender(gender);
    };

    const [disaled, setDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const startEditing = () => {
        setDisabled(false);
        setEditMode(true);
    }

    const stopEditing = () => {
        setDisabled(true);
        setEditMode(false);
    }

    const getUserDetails = () => {
        User.getUserId(userId)
            .then((response) => {
                const user = response.data;

                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setGender(user.gender);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getUserDetails, []);

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
                            <TextField value={firstName} label="First Name" onChange={onChangeFirstName} InputProps={{ readOnly: disaled }} name="firstName" htmlFor="firstName" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={lastName} onChange={onChangeLastName} InputProps={{ readOnly: disaled }} name="lastName" htmlFor="lastName" variant="outlined" fullWidth label="Last Name" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={email} label="Email Address" onChange={onChangeEmail} InputProps={{ readOnly: disaled }} name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={gender} htmlFor="gender" variant="outlined" InputProps={{ readOnly: disaled }} fullWidth onChange={onChangeGender} type="text" select label="Gender">
                                <MenuItem value={"Male"} >Male</MenuItem>
                                <MenuItem value={"Female"} >Female</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} container spacing={2}>
                        {editMode ?
                            <>
                                <Button className={classes.buttonEditSave} onClick={() => { }} fullWidth variant="contained"  >
                                    Save
                                </Button>
                                <Button className={classes.buttonEditStop} onClick={() => { stopEditing() }} fullWidth variant="contained" color="primary" >
                                    Stop Editinig
                                </Button>
                            </>
                            :
                            <Button className={classes.buttonEditStart} onClick={() => { startEditing() }} fullWidth variant="contained" color="primary" >
                                Edit
                            </Button>
                        }
                        <Button className={classes.buttonClose} component={Link} to="/usersList" fullWidth variant="contained" color="secondary" >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default UserDetails;


