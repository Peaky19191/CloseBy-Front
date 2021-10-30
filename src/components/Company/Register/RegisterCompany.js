import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from '@material-ui/lab';
import { regCompany } from "../../../actions/Profiles/company";

const RegCompany = () => {
    const classes = useStyles();

    const [name, setName] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [errors, setErrors] = useState({});

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        if (validate())
            dispatch(regCompany(name))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
    };

    const validate = () => {
        let temp = {}
        temp.name = name ? "" : "This field is required (Name)"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "");
    }

    const enabled = name.length > 0

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register Company</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully registered your company</strong>
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
                            <TextField label="Name" error={errors.name} helperText={(errors.name)} name="name" htmlFor="name" variant="outlined" type="text" value={name} onChange={onChangeName} fullWidth autoFocus />
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

export default RegCompany;
