import React, { useState, useEffect } from "react";
import useStyles from './styles';
import CompAdmin from '../../../../Services/Profiles/companyAdmin.service'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { editCompAdmin } from "../../../../Actions/Profiles/companyAdmin";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCompanyId } from "../../../../Actions/Profiles/company";
import BusinessIcon from '@mui/icons-material/Business';

const CompAdminDetails = () => {
    const classes = useStyles();
    const compAdminId = useSelector(state => state.companyAdmin.id_comp_admin);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState({});
    const [compId, setCompId] = useState("");
    const [compName, setCompName] = useState("");

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

    const getCompAdminDetails = () => {
        CompAdmin.getCompanyAdminId(compAdminId)
            .then((response) => {
                const compAdmin = response.data;
                console.log(compAdmin);

                setFirstName(compAdmin.firstName);
                setLastName(compAdmin.lastName);
                setEmail(compAdmin.email);
                setGender(compAdmin.gender);
                setCompId(compAdmin.company.id);
                setCompName(compAdmin.company.name);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getCompAdminDetails, [compAdminId]);

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const setIdCompany = (id) => {
        dispatch(setCompanyId(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        if (validate())
            dispatch(editCompAdmin(compAdminId, firstName, lastName, gender, email))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
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
                <Typography component="h1" variant="h5">Details of the Company Admin</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully edit your Company Admin</strong>
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
                    <Grid className={classes.buttonsContainer}>
                        <Button className={classes.buttonCompanyDetails} component={Link} to="/companyDetails" onClick={() => { setIdCompany(compId) }} fullWidth variant="contained" color="primary" >
                            {/* <BusinessIcon /> */}
                            Company - {compName}
                        </Button>
                        {editMode ?
                            <>
                                <Button disabled={!enabled} type="submit" className={classes.buttonEditSave} fullWidth variant="contained"  >
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
                        <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default CompAdminDetails;


