import React, { useState, useEffect } from "react";
import useStyles from './styles';
import CompWorker from '../../../../Services/Profiles/companyWorker.service'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { editCompWorker, getCompWorkerIdDispatch } from "../../../../Actions/Profiles/companyWorker";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCompanyDispatch } from "../../../../Actions/Profiles/company";
import BusinessIcon from '@mui/icons-material/Business';
import CircularProgress from '@material-ui/core/CircularProgress';

const CompWorkerDetails = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const { message } = useSelector(state => state.message);

    const compWorker = useSelector(state => state.companyWorker.comp_worker);

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [company, setCompany] = useState(compWorker.company);

    const [firstName, setFirstName] = useState(compWorker.firstName);
    const [lastName, setLastName] = useState(compWorker.lastName);
    const [email, setEmail] = useState(compWorker.email);
    const [gender, setGender] = useState(compWorker.gender);
    const [errors, setErrors] = useState({});

    const enabled =
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        gender.length > 0;

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

    const [successful, setSuccessful] = useState(false);

    const dispatch = useDispatch();

    const dispatchCompany = (company) => {
        dispatch(setCompanyDispatch(company))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        setLoading(true);

        // if (validate())
        dispatch(editCompWorker(compWorker.id, firstName, lastName, gender, email))
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
        console.log(Object.values(temp).every(x => x == ""));
        return Object.values(temp).every(x => x == "");
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Details of the Company Worker</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully edit your Company Worker</strong>
                    </Alert>
                    :
                    (message ?
                        <Alert className={successful ? classes.alert : classes.alert} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>{message}</strong>
                        </Alert>
                        :
                        null
                    )
                }
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField value={firstName} error={errors.firstName} helperText={(errors.firstName)} label="First Name" onChange={onChangeFirstName} InputProps={{ readOnly: disaled }} name="firstName" htmlFor="firstName" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={lastName} error={errors.lastName} helperText={(errors.lastName)} onChange={onChangeLastName} InputProps={{ readOnly: disaled }} name="lastName" htmlFor="lastName" variant="outlined" fullWidth label="Last Name" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={email} error={errors.email} helperText={(errors.email)} label="Email Address" onChange={onChangeEmail} InputProps={{ readOnly: disaled }} name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField error={errors.gender} helperText={(errors.gender)} value={gender} htmlFor="gender" variant="outlined" InputProps={{ readOnly: disaled }} fullWidth onChange={onChangeGender} type="text" select={disaled ? false : true} label="Gender">
                                <MenuItem value={"Male"} >Male</MenuItem>
                                <MenuItem value={"Female"} >Female</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} >
                        {(currentProfile.role === "GlobalAdmin") &&
                            <Button className={classes.buttonCompanyDetails} component={Link} to="/companyDetails" onClick={() => { dispatchCompany(company) }} fullWidth variant="contained" color="primary" >
                                {/* <BusinessIcon /> */}
                                Company Details
                            </Button>}
                        {editMode ?
                            <>
                                <Button disabled={!enabled} type="submit" className={classes.buttonEditSave} fullWidth variant="contained"  >
                                    {loading ? (
                                        <CircularProgress size="20px" />
                                    ) : "Save"}
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
                        <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                            back
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default CompWorkerDetails;


