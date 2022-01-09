import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from '@material-ui/lab';
import { sendContactMessageDispatch } from "../../Actions/contact";
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '..//Message/Message';
import { useHistory } from "react-router-dom";

const About = () => {

    const classes = useStyles();


    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (

        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Developers of this project:</Typography>
                <Grid className={classes.containerNames} container spacing={2}>
                    <Grid item xs={12} >
                        <Typography component="h1" variant="h6">Krzysztof Kopeć - s15509</Typography>

                    </Grid>
                    <Grid item xs={12} >
                        <Typography component="h1" variant="h6">Grzegorz Kamiński - s17184</Typography>

                    </Grid>
                    <Grid item xs={12} >
                        <Typography component="h1" variant="h6">Bartosz Gołda - s16728</Typography>

                    </Grid>
                </Grid>
                <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                    Back
                </Button>
            </Paper>
        </Container>


        // <div style={{
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     height: '90vh',
        // }}
        // >
        //     <h1>About us</h1>
        //     <p>
        //         <b /
        //         <b />
        //         <b />
        //         <b />
        //     </p>
        // </div>
    )
}

export default About;
