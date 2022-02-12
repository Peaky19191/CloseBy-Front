import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCompanyListDispatch } from "../../../../Actions/Profiles/company";
import { regCompAdmin } from "../../../../Actions/Profiles/companyAdmin";
import Message from '../../../Message/Message';
import useStyles from './styles';

const RegCompAdmin = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [companyId, setCompanyId] = useState("");

    const [loadMessage, setLoadMessage] = useState(false);

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    // eslint-disable-next-line
    const [page, setPage] = useState(0);
    // eslint-disable-next-line
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const [listLoaded, setListLoaded] = useState(false);
    const [company, setCompany] = useState([]);

    const getList = () => {
        dispatch(getCompanyListDispatch(page, rowsPerPage))
            .then((response) => {
                const companysTemp = response.data.items;

                setCompany(companysTemp);
                setListLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);// eslint-disable-line react-hooks/exhaustive-deps

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
        setLoadMessage(false);

        if (validate()) {
            setLoading(true);
            dispatch(regCompAdmin(firstName, lastName, gender, email, companyId))
                .then(() => {
                    setLoadMessage(true);
                    setLoading(false);
                })
                .catch(() => {
                    setLoadMessage(true);
                    setLoading(false);
                });
        }
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
        temp.companyId = gender.length !== 0 ? "" : "This field is required (Compnay Name)"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const enabled =
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        gender.length > 0 &&
        companyId.length > 0;

    return (
        (listLoaded !== true) ?
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid> :
            <>
                <Container className={classes.container} component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <SupervisorAccountIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Register Company Admin</Typography>
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
                                    <TextField label="Gender" error={errors.gender} helperText={(errors.gender)} name="gender" htmlFor="gender" variant="outlined" fullWidth value={gender} onChange={onChangeGender} type="text" select >
                                        <MenuItem value={"Male"} >Male</MenuItem>
                                        <MenuItem value={"Female"} >Female</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField label="Company" error={errors.companyId} helperText={(errors.companyId)} name="companyId" htmlFor="companyId" variant="outlined" type="text" value={companyId} onChange={onChangeCompanyId} fullWidth select >
                                        {company.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))}
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

export default RegCompAdmin;
