import React, { useState, useEffect } from "react";
import useStyles from './styles';
import Event from '../../../Api/events'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import { editEvent } from "../../../Actions/Profiles/events";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";

const EventDetails = () => {
    const classes = useStyles();
    const eventId = useSelector(state => state.event.id_event);

    const [title, setTitle] = useState("");

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const [desc, setDesc] = useState("");

    const onChangeDesc = (e) => {
        const desc = e.target.value;
        setDesc(desc);
    };

    const [startDate, setStartDate] = useState("");

    const onChangeStartDate = (e) => {
        const startDate = e.target.value;
        setStartDate(startDate);
    };
    const [type, setType] = useState("");

    const onChangeType = (e) => {
        const type = e.target.value;
        setType(type);
    };

    const [status, setStatus] = useState("");

    const onChangeStatus = (e) => {
        const status = e.target.value;
        setStatus(status);
    };

    const [limit, setLimit] = useState("");

    const onChangeLimit = (e) => {
        const limit = e.target.value;
        setLimit(limit);
    };

    const getEventDetails = () => {
        Event.getEventId(eventId)
            .then((response) => {
                const event = response.data;

                setTitle(event.title);
                setDesc(event.description);
                setStartDate(event.startDateTime);
                setType(event.type);
                setStatus(event.status);
                setLimit(event.limit);

            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getEventDetails, [eventId]);

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

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


    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        dispatch(editEvent(eventId, title, desc, startDate, type, status, limit))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Details of the Event</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully edit your event</strong>
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
                            <TextField value={title} label="Title" onChange={onChangeTitle} InputProps={{ readOnly: disaled }} name="title" htmlFor="title" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={desc} label="Desc" onChange={onChangeDesc} InputProps={{ readOnly: disaled }} name="desc" htmlFor="desc" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={startDate} label="Start Date" onChange={onChangeStartDate} InputProps={{ readOnly: disaled }} name="startDate" htmlFor="startDate" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={type} label="Type" onChange={onChangeType} InputProps={{ readOnly: disaled }} name="type" htmlFor="type" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={status} label="Status" onChange={onChangeStatus} InputProps={{ readOnly: disaled }} name="status" htmlFor="status" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={limit} label="Poeple Limit" onChange={onChangeLimit} InputProps={{ readOnly: disaled }} name="limit" htmlFor="limit" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} container spacing={2}>
                        {editMode ?
                            <>
                                <Button type="submit" className={classes.buttonEditSave} fullWidth variant="contained"  >
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
                        <Button className={classes.buttonClose} component={Link} to="/eventList" fullWidth variant="contained" color="secondary" >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EventDetails;


