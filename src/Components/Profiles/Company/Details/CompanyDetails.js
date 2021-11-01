import React, { useState, useEffect } from "react";
import useStyles from './styles';
import Company from '../../../../Api/company'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';

const CompanyDetails = () => {
    const classes = useStyles();
    const companyId = useSelector(state => state.company.id_company);

    const [name, setName] = useState("");

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
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

    const getCompanyDetails = () => {
        if (companyId !== undefined)
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

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Details of the Company {name}</Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField value={name} label="Company Name" onChange={onChangeName} InputProps={{ readOnly: disaled }} name="name" htmlFor="name" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} container spacing={2}>
                        {editMode ?
                            <>
                                <Button className={classes.buttonEditSave} onClick={() => { }} fullWidth variant="contained"  >
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


