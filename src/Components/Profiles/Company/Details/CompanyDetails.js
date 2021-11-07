import React, { useState, useEffect } from "react";
import useStyles from './styles';
import Company from '../../../../Api/company'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import { editCompany } from "../../../../Actions/Profiles/company";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";

const CompanyDetails = () => {
    const classes = useStyles();
    const companyId = useSelector(state => state.company.id_company);

    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const enabled = name.length > 0;

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

    const getCompanyDetails = () => {
        Company.getCompanyId(companyId)
            .then((response) => {
                const company = response.data;

                setName(company.name);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getCompanyDetails, [companyId]);

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        if (validate())
            dispatch(editCompany(companyId, name))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
    };

    const validate = () => {
        let temp = {}
        temp.name = (/^[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/).test(name) ? "" : "Whitespaces are not allowed"
        setErrors({
            ...temp
        })
        //console.log(Object.values(temp).every(x => x == ""));
        return Object.values(temp).every(x => x == "");
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Details of the Company</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully edit your company</strong>
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
                            <TextField value={name} label="Company Name" onChange={onChangeName} InputProps={{ readOnly: disaled }} name="name" htmlFor="name" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} container spacing={2}>
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
                        <Button className={classes.buttonClose} component={Link} to="/companyList" fullWidth variant="contained" color="secondary" >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default CompanyDetails;


