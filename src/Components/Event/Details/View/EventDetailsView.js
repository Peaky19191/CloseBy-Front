import React, { useState, useEffect } from "react";
import useStyles from './styles';
import Event from '../../../../Services/Profiles/event.service'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { editEvent } from "../../../../Actions/Profiles/events";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import MapDetailsView from '../../../Map/DetailsMap/View/DetailsViewMap'
import EventIcon from '@mui/icons-material/Event';
import EventTypes from '../../../../Static/select'
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { regEvent } from "../../../../Actions/Profiles/events";
import CompWorker from '../../../../Services/Profiles/companyWorker.service'
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment'
import { setNewEventLoc } from "../../../../Actions/Profiles/events";
import { setCurrentEventLoc } from "../../../../Actions/Profiles/events";
import { useHistory } from "react-router-dom";

const Input = styled(MuiInput)`
  width: 42px;
`;

const EventDetailsView = () => {
    const classes = useStyles();

    const eventId = useSelector(state => state.event.id_event);


    const [title, setTitle] = useState("");

    const [desc, setDesc] = useState("");


    const [startDate, setStartDate] = useState("");

    const [endDate, setEndDate] = useState("");

    const [type, setType] = useState("");

    // const [status, setStatus] = useState("");


    const [limit, setLimit] = useState("");

    const handleBlur = () => {
        if (limit < 0) {
            setLimit(0);
        } else if (limit > 100) {
            setLimit(100);
        }
    };

    const getEventDetails = () => {
        Event.getEventId(eventId)
            .then((response) => {
                const event = response.data;

                setTitle(event.title);
                setDesc(event.description);
                setStartDate(moment(event.startDateTime).format('MM/DD/YYYY - HH:mm'));
                setEndDate(moment(event.endDateTime).format('MM/DD/YYYY - HH:mm'));
                setType(event.type);
                // setStatus(event.status);
                setLimit(event.ticketLimit);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getEventDetails, []);

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        // setSuccessful(false);
        // dispatch()
        //     .then(() => {
        //         setSuccessful(true);
        //     })
        //     .catch(() => {
        //         setSuccessful(false);
        //     });
    };

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Grid container className={classes.titleContainer} >
                    <Avatar className={classes.avatar}>
                        <EventIcon />
                    </Avatar>
                    <Typography className={classes.title} component="h1" variant="h4">Event {title}</Typography>
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
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.formContainer}>
                        <Grid className={classes.fieldsContainer} >
                            <Grid className={classes.gridField} >
                                <TextField value={title} label="Title" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Type" variant="outlined" fullWidth value={type} type="text" InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Start Date and Hour" value={startDate} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="End Date and Hour" value={endDate} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <Typography id="input-slider" gutterBottom>
                                    Tickets left
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider className={classes.limit} value={limit} />
                                    </Grid>
                                    <Grid item>
                                        <Input value={limit} size="small" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridField}>
                                <TextField label="Description" rows={6} multiline fullWidth name="desc" htmlFor="desc" variant="outlined" type="text" value={desc} InputProps={{ readOnly: true }} />
                            </Grid>
                            {/* <Grid item xs={12} >
                            <TextField value={status} label="Status" InputProps={{ readOnly: true }} name="status" htmlFor="status" variant="outlined" fullWidth />
                        </Grid> */}
                        </Grid>
                        <Grid className={classes.mapContainer}  >
                            <MapDetailsView currentEventId={[eventId]} />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.buttonsContainer}>
                        <Grid item className={classes.buttonClose}>
                            <Button onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                                Close
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonSubmit}>
                            <Button onClick={() => { }} className={classes.buttonEditSave} fullWidth variant="contained"  >
                                Buy ticket
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EventDetailsView;


