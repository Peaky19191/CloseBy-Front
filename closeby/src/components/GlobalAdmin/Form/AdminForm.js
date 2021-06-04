import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import UserService from "../../../services/user.service";

const AdminForm = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register Admin</Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="First Name" name="firstName" htmlFor="firstName" variant="outlined" type="text" fullWidth autoFocus />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Last Name" name="lastName" htmlFor="lastName" variant="outlined" type="text" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Email Address" name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
                        </Grid>
                        <InputLabel className={classes.select} id="selectLabel">Select your gender</InputLabel>
                        <Select className={classes.select} name="gender" labelId="selectLabel" open={open} onClose={handleClose} onOpen={handleOpen} type="text" variant="outlined" fullWidth>
                            <MenuItem value="Male" >Male</MenuItem>
                            <MenuItem value="Female" >Female</MenuItem>
                        </Select>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Register Admin
                </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AdminForm;
