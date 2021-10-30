import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { regCompAdmin } from "../../../../actions/Profiles/companyAdmin";
import { Alert, AlertTitle } from '@material-ui/lab';
import Company from '../../../../api/company'

const RegCompAdmin = () => {
    const classes = useStyles();

    const { message } = useSelector(state => state.message);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [companyId, setCompanyId] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const [company, setCompany] = useState([]);

    const getList = () => {
        Company.getCompanyList(page, rowsPerPage)
            .then((response) => {
                const companysTemp = response.data.items;

                setCompany(companysTemp);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

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
    const onChangeCompanyId = (e) => {
        const companyId = e.target.value;
        setCompanyId(companyId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        if (validate())
            dispatch(regCompAdmin(firstName, lastName, gender, email, companyId))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
    };

    const validate = () => {
        let temp = {}
        temp.firstName = firstName ? "" : "This field is required (First name)"
        temp.lastName = lastName ? "" : "This field is required (Last name)"
        temp.email = (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid"
        temp.gender = gender.length != 0 ? "" : "This field is required (gender)"
        temp.companyId = gender.length != 0 ? "" : "This field is required (Compnay Name)"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "");
    }

    const enabled =
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        gender.length > 0 &&
        companyId.length > 0;

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register Company Admin</Typography>
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
                            <TextField label="First Name" error={errors.firstName} helperText={(errors.firstName)} name="firstName" htmlFor="firstName" variant="outlined" type="text" value={firstName} onChange={onChangeFirstName} fullWidth autoFocus />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Last Name" error={errors.lastName} helperText={(errors.lastName)} name="lastName" htmlFor="lastName" variant="outlined" type="text" value={lastName} onChange={onChangeLastName} fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Email Address" error={errors.email} helperText={(errors.email)} name="email" htmlFor="email" variant="outlined" type="email" value={email} onChange={onChangeEmail} fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Gender" error={errors.gender} helperText={(errors.gender)} name="gender" htmlFor="gender" variant="outlined" fullWidth value={gender} onChange={onChangeGender} type="text" select label="Gender">
                                <MenuItem value={"Male"} >Male</MenuItem>
                                <MenuItem value={"Female"} >Female</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Company Id" error={errors.companyId} helperText={(errors.companyId)} name="companyId" htmlFor="companyId" variant="outlined" type="text" value={companyId} onChange={onChangeCompanyId} fullWidth select label="Company Name">
                                {company.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button type="submit" disabled={!enabled} fullWidth variant="contained" color="primary" className={classes.submit}>
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default RegCompAdmin;
