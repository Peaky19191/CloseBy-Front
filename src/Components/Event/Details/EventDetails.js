import React, { useState, useEffect } from "react";
import useStyles from './styles';
import Event from '../../../Api/events'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField, MenuItem } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import { editEvent } from "../../../Actions/Profiles/events";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import Map from '../../Map/Map'
import EventIcon from '@mui/icons-material/Event';
import EventTypes from '../../../Static/select'
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { regEvent } from "../../../Actions/Profiles/events";
import CompWorker from '../../../Api/companyWorker'
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment'
import { setEventLoc } from "../../../Actions/Profiles/events";

const Input = styled(MuiInput)`
  width: 42px;
`;


const EventDetails = () => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const eventId = useSelector(state => state.event.id_event);

    const loc_lat = useSelector(state => ((state.event.event_loc !== undefined) ? state.event.event_loc.lat : ""));
    const loc_lng = useSelector(state => ((state.event.event_loc !== undefined) ? state.event.event_loc.lng : ""));

    const [eventIdToPass, setEventIdToPass] = useState("");

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

    const [startDate, setStartDate] = useState("2000-01-01T00:00:00");

    const onChangeDate = (e) => {
        const dateFormat = moment(e).format('yyyy-MM-DDTHH:mm:ss');
        setStartDate(dateFormat);
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

    const handleSliderChange = (event, newValue) => {
        setLimit(newValue);
    };

    const handleInputChange = (event) => {
        setLimit(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (limit < 0) {
            setLimit(0);
        } else if (limit > 100) {
            setLimit(100);
        }
    };

    const [companyId, setCompanyId] = useState("");

    const getCompanyId = () => {
        CompWorker.getCompanyWorkerId(currentProfile.id)
            .then((response) => {
                const compId = response.data.company.id;
                setCompanyId(compId);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getCompanyId, []);

    const getEventDetails = () => {
        Event.getEventId(eventId)
            .then((response) => {
                const event = response.data;

                setEventIdToPass(event.id);
                setTitle(event.title);
                setDesc(event.description);
                setStartDate(event.startDateTime);
                setType(event.type);
                setStatus(event.status);
                setLimit(event.limit);


                dispatch(setEventLoc(event.localization.latitude, event.localization.longitude));

            })
            .catch((e) => {
                console.log(e);
            });


    }
    useEffect(getEventDetails, []);

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

    const handleSubmit = () => {
        setSuccessful(false);
        dispatch(editEvent(eventIdToPass, title, companyId, loc_lat, loc_lng, startDate, status, desc, limit, type))
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
                <Grid container className={classes.titleContainer} >
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
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.formContainer}>
                        <Grid className={classes.fieldsContainer} >
                            <Grid className={classes.gridField} >
                                <TextField value={title} label="Title" onChange={onChangeTitle} InputProps={{ readOnly: disaled }} name="title" htmlFor="title" variant="outlined" fullWidth />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Start Date and Hour"
                                            value={startDate}
                                            onChange={(newValue) => {
                                                onChangeDate(newValue);
                                            }}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Type of the Event" variant="outlined" fullWidth value={type} onChange={onChangeType} type="text" select >
                                    {EventTypes.map((EventTypes) => (
                                        <MenuItem key={EventTypes} value={EventTypes}>{EventTypes}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <Typography id="input-slider" gutterBottom>
                                    People Limit
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider className={classes.limit}
                                            value={limit}
                                            onChange={handleSliderChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input name="limit" htmlFor="limit" value={limit} size="small" onChange={handleInputChange} onBlur={handleBlur}
                                            inputProps={{
                                                step: 10,
                                                min: 0,
                                                max: 100,
                                                type: 'number',
                                                'aria-labelledby': 'input-slider',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridField}>
                                <TextField label="Description" rows={10} multiline fullWidth name="desc" htmlFor="desc" variant="outlined" type="text" value={desc} onChange={onChangeDesc} InputProps={{ readOnly: disaled }} />
                            </Grid>
                            {/* <Grid item xs={12} >
                            <TextField value={status} label="Status" onChange={onChangeStatus} InputProps={{ readOnly: disaled }} name="status" htmlFor="status" variant="outlined" fullWidth />
                        </Grid> */}
                        </Grid>
                        <Grid className={classes.mapContainer}  >
                            <Map handleLocLat={loc_lat} handleLocLng={loc_lng} />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.buttonsContainer}>
                        <Grid item className={classes.buttonClose}>
                            <Button component={Link} to="/eventList" fullWidth variant="contained" color="secondary" >
                                Close
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonSubmit}>
                            {editMode ?
                                <Grid container className={classes.buttonsContainer2}>
                                    <Button className={classes.buttonSubmit} onClick={() => { stopEditing() }} fullWidth variant="contained" color="primary" >
                                        Stop Editinig
                                    </Button>
                                </Grid>
                                :
                                <Button onClick={() => { startEditing() }} fullWidth variant="contained" color="primary" >
                                    Edit
                                </Button>
                            }
                        </Grid>
                        {editMode &&
                            <Grid item className={classes.buttonClose}>
                                <Button onClick={() => { handleSubmit() }} className={classes.buttonEditSave} fullWidth variant="contained"  >
                                    Save
                                </Button>
                            </Grid>}
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EventDetails;


