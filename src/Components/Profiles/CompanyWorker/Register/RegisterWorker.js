import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { regCompWorker } from "../../../../Actions/Profiles/companyWorker";
import { Alert, AlertTitle } from '@material-ui/lab';
import CompAdmin from '../../../../Services/Profiles/companyAdmin.service'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { getCompAdminIdDispatch } from "../../../../Actions/Profiles/companyAdmin";
import CircularProgress from '@material-ui/core/CircularProgress';

const RegCompWorker = () => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);
    const company = useSelector(state => (state.companyAdmin.get_comp_admin_id.company.id));
    const [loading, setLoading] = useState(false);

    const [companyLoaded, setCompanyLoaded] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [errors, setErrors] = useState({});

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const enabled =
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        gender.length > 0;

    useEffect(() => {
        dispatch(getCompAdminIdDispatch(currentProfile.id))
            .then(() => {
                setCompanyLoaded(true)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

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
        setLoading(true);

        if (validate())
            dispatch(regCompWorker(firstName, lastName, gender, email, company))
                .then(() => {
                    setSuccessful(true);
                    setLoading(false);
                })
                .catch(() => {
                    setSuccessful(false);
                    setLoading(false);
                });
    };

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const validate = () => {
        let temp = {}
        temp.firstName = (/^[A-Za-z]+$/).test(firstName) ? "" : "Numbers and whitespaces are not allowed"
        temp.lastName = (/^[A-Za-z]+$/).test(lastName) ? "" : "Numbers and whitespaces are not allowed"
        temp.email = (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid"
        temp.gender = gender.length != 0 ? "" : "This field is required (gender)"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "");
    }

    return (
        (companyLoaded !== true) ?
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid> :
            <>
                <Container className={classes.container} component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <SupervisorAccountIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Register Company Worker</Typography>
                        {successful ?
                            <Alert className={classes.alert} severity="success">
                                <AlertTitle>Success</AlertTitle>
                                <strong>You have successfully registered your Company Worker account</strong>
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
                                    <TextField label="First Name" error={errors.firstName} helperText={(errors.firstName)} name="firstName" htmlFor="firstName" variant="outlined" type="text" value={firstName} onChange={onChangeFirstName} fullWidth autoFocus />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField label="Last Name" error={errors.lastName} helperText={(errors.lastName)} name="lastName" htmlFor="lastName" variant="outlined" type="text" value={lastName} onChange={onChangeLastName} fullWidth />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField label="Email Address" error={errors.email} helperText={(errors.email)} name="email" htmlFor="email" variant="outlined" type="email" value={email} onChange={onChangeEmail} fullWidth />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField label="Gender"
                                        error={errors.gender} helperText={(errors.gender)} name="gender" htmlFor="gender" variant="outlined" fullWidth value={gender} onChange={onChangeGender} type="text" select label="Gender">
                                        <MenuItem value={"Male"} >Male</MenuItem>
                                        <MenuItem value={"Female"} >Female</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Button type="submit" disabled={!enabled} fullWidth variant="contained" color="primary" className={classes.submit}>
                                {loading ? (
                                    <CircularProgress size="20px" />
                                ) : "Register"}
                            </Button>
                            <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                                Close
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </>
    );
};

export default RegCompWorker;
