import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCompAdminIdDispatch } from "../../../../Actions/Profiles/companyAdmin";
import { regCompWorker } from "../../../../Actions/Profiles/companyWorker";
import Message from '../../../Message/Message';
import useStyles from './styles';

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

    const [loadMessage, setLoadMessage] = useState(false);

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
        setLoadMessage(false);
        setLoading(true);

        if (validate())
            dispatch(regCompWorker(firstName, lastName, gender, email, company))
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
                        {loadMessage &&
                            <Message />
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
                                back
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </>
    );
};

export default RegCompWorker;
