import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { setCompanyDispatch } from "../../../../Actions/Profiles/company";
import { editCompAdmin } from "../../../../Actions/Profiles/companyAdmin";
import Message from '../../../Message/Message';
import useStyles from './styles';

const CompAdminDetails = () => {
    const classes = useStyles();
    const compAdmin = useSelector(state => state.companyAdmin.comp_admin);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [company, setCompany] = useState(compAdmin.company);
    const [firstName, setFirstName] = useState(compAdmin.firstName);
    const [lastName, setLastName] = useState(compAdmin.lastName);
    const [email, setEmail] = useState(compAdmin.email);
    const [gender, setGender] = useState(compAdmin.gender);
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
    const [loadMessage, setLoadMessage] = useState(false);

    const dispatch = useDispatch();
    const dispatchCompany = (company) => {
        dispatch(setCompanyDispatch(company))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadMessage(false);
        setLoading(true);

        if (validate())
            dispatch(editCompAdmin(compAdmin.id, firstName, lastName, gender, email))
                .then(() => {
                    setLoadMessage(true);
                    setLoading(false);
                })
                .catch(() => {
                    setLoadMessage(true);
                    setLoading(false);
                });
    };

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const validate = () => {
        let temp = {}
        temp.firstName = (/^[A-Za-ząćęłńóśźżĄĘŁŃÓŚŹŻ]+$/).test(firstName) ? "" : "Numbers and whitespaces are not allowed"
        temp.lastName = (/^[A-Za-ząćęłńóśźżĄĘŁŃÓŚŹŻ]+$/).test(lastName) ? "" : "Numbers and whitespaces are not allowed"
        temp.email = (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid"
        temp.gender = gender.length !== 0 ? "" : "This field is required (gender)"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "");
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Details of the Company Admin</Typography>
                {loadMessage &&
                    <Message />
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
                    <Grid className={classes.buttonsContainer}>
                        <Button className={classes.buttonCompanyDetails} component={Link} to="/companyDetails" onClick={() => { dispatchCompany(company) }} fullWidth variant="contained" color="primary" >
                            Company Details
                        </Button>
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

export default CompAdminDetails;


