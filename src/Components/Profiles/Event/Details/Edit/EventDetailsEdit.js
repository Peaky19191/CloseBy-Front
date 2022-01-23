import { Avatar, Button, Container, Grid, InputAdornment, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventIcon from '@mui/icons-material/Event';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { setEditMapModeDispatch } from "../../../../../Actions/Map/map";
import { setCompanyDispatch } from "../../../../../Actions/Profiles/company";
import { editEvent, getEventIdDispatch, setNewEventLoc } from "../../../../../Actions/Profiles/events";
import EventTypes from '../../../../../Static/select';
import MapDetailsEdit from '../../../../Map/DetailsMap/Edit/DetailsEditMap';
import Message from '../../../../Message/Message';
import useStyles from './styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

const EventDetailsEdit = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const { profile: currentProfile } = useSelector((state) => state.auth);
    const { event: currentEvent } = useSelector((state) => state.event);
    // eslint-disable-next-line
    const [eventId, setEventId] = useState(currentEvent.id);

    const loc_lat = useSelector(state => ((state.event.new_event_loc !== undefined) ? state.event.new_event_loc.lat : ""));
    const loc_lng = useSelector(state => ((state.event.new_event_loc !== undefined) ? state.event.new_event_loc.lng : ""));

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

    const [ticketPrice, setTicketPrice] = useState("");

    const onChangeTicketPrice = (e) => {
        const ticketPrice = e.target.value;
        setTicketPrice(ticketPrice);
    };

    const [startDate, setStartDate] = useState("2000-01-01T00:00:00");
    const onChangeStartDate = (e) => {
        const dateFormat = moment(e).format('yyyy-MM-DDTHH:mm:ss');
        setStartDate(dateFormat);
    };

    const [endDate, setEndDate] = useState("2000-01-01T00:00:00");
    const onChangeEndDate = (e) => {
        const dateFormat = moment(e).format('yyyy-MM-DDTHH:mm:ss');
        setEndDate(dateFormat);
    };

    const [type, setType] = useState("");

    const onChangeType = (e) => {
        const type = e.target.value;
        setType(type);
    };

    const [status, setStatus] = useState("");

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

    const [company, setCompany] = useState("");

    const getEventDetails = () => {
        dispatch(getEventIdDispatch(eventId))
            .then((response) => {
                const event = response.data;

                setEventIdToPass(event.id);
                setTitle(event.title);
                setDesc(event.description);
                setStartDate(event.startDateTime);
                setEndDate(event.endDateTime);
                setType(event.type);
                setStatus(event.status);
                setLimit(event.ticketLimit);
                setCompany(event.company);
                setTicketPrice(event.ticketPrice);

                dispatch(setNewEventLoc(event.localization.latitude, event.localization.longitude));
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getEventDetails, []);// eslint-disable-line react-hooks/exhaustive-deps

    const [listLoaded, setListLoaded] = useState(false);

    const dispatch = useDispatch();

    const dispatchCompany = (company) => {
        dispatch(setCompanyDispatch(company))
    }

    const [disaled, setDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const startEditing = () => {
        setDisabled(false);
        setEditMode(true);
        dispatch(setEditMapModeDispatch(true))
    }

    const stopEditing = () => {
        setDisabled(true);
        setEditMode(false);
        dispatch(setEditMapModeDispatch(false))
    }

    const handleSubmit = () => {
        setListLoaded(false);
        setLoading(true);

        dispatch(editEvent(eventIdToPass, title, company.id, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type, ticketPrice))
            .then(() => {
                setListLoaded(true);
                setLoading(false);
            })
            .catch(() => {
                setListLoaded(true);
                setLoading(false);
            });
    };

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const enabled =
        title.length > 0 &&
        type.length > 0 &&
        `${ticketPrice}`.length > 0 &&
        desc.length > 0;

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Grid container className={classes.titleContainer} >
                    <Avatar className={classes.avatar}>
                        <EventIcon />
                    </Avatar>
                    <Typography className={classes.title} component="h1" variant="h4">Details of the Event</Typography>
                    {listLoaded &&
                        <Message />
                    }
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.formContainer}>
                        <Grid className={classes.fieldsContainer} >
                            <Grid className={classes.gridField} >
                                <TextField value={title} label="Title" onChange={onChangeTitle} InputProps={{ readOnly: disaled }} name="title" htmlFor="title" variant="outlined" fullWidth />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Type of the Event" variant="outlined" fullWidth value={type} onChange={onChangeType} type="text" InputProps={{ readOnly: disaled }} select={disaled ? false : true}>
                                    {EventTypes.map((EventTypes) => (
                                        <MenuItem key={EventTypes} value={EventTypes}>{EventTypes}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid className={classes.gridField} >
                                {editMode ?
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={3}>
                                            <DateTimePicker
                                                renderInput={(props) => <TextField {...props} />}
                                                label="Start Date and Hour"
                                                value={startDate}
                                                onChange={(newValue) => {
                                                    onChangeStartDate(newValue);
                                                }}
                                                InputProps={{ readOnly: disaled }}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    :
                                    <TextField label="Start Date and Hour" value={moment(startDate).format('MM/DD/YYYY HH:mm a')} InputProps={{ readOnly: true }} fullWidth />
                                }
                            </Grid>
                            <Grid className={classes.gridField} >
                                {editMode ?
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={3}>
                                            <DateTimePicker
                                                renderInput={(props) => <TextField {...props} />}
                                                label="End Date and Hour"
                                                value={endDate}
                                                onChange={(newValue) => {
                                                    onChangeEndDate(newValue);
                                                }}
                                                InputProps={{ readOnly: disaled }}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    :
                                    <TextField label="End Date and Hour" value={moment(endDate).format('MM/DD/YYYY HH:mm a')} InputProps={{ readOnly: true }} fullWidth />
                                }
                            </Grid>
                            <Grid className={classes.gridField} >
                                <Typography id="input-slider" gutterBottom>
                                    Tickets Limit
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider className={classes.limit}
                                            value={limit}
                                            onChange={editMode && handleSliderChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input name="limit" type="number" htmlFor="limit" value={limit} size="small" onChange={handleInputChange} onBlur={handleBlur}
                                            inputProps={
                                                editMode ?
                                                    {
                                                        step: 1,
                                                        min: 0,
                                                        max: 100,
                                                        type: 'number',
                                                        'aria-labelledby': 'input-slider',
                                                    }
                                                    :
                                                    {
                                                        readOnly: true
                                                    }
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Tickets left" fullWidth name="ticketsLeft" htmlFor="ticketsLeft" variant="outlined" type="text" value={limit - currentEvent.ticketsBought} onChange={onChangeTicketPrice} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Ticket price" fullWidth name="ticketPrice" htmlFor="ticketPrice" variant="outlined" type="number" value={ticketPrice} onChange={onChangeTicketPrice} InputProps={{ readOnly: disaled, startAdornment: <InputAdornment position="start">€</InputAdornment>, }} />
                            </Grid>
                            <Grid className={classes.gridField}>
                                <TextField label="Description" rows={6} multiline fullWidth name="desc" htmlFor="desc" variant="outlined" type="text" value={desc} onChange={onChangeDesc} InputProps={{ readOnly: disaled }} />
                            </Grid>
                            {/* <Grid item xs={12} >
                            <TextField value={status} label="Status" onChange={onChangeStatus} InputProps={{ readOnly: disaled }} name="status" htmlFor="status" variant="outlined" fullWidth />
                        </Grid> */}
                        </Grid>
                        <Grid className={classes.mapContainer}  >
                            <MapDetailsEdit currentEventId={[eventId]} editModePass={editMode} />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.buttonsContainer}>
                        <Grid item className={classes.buttonClose}>
                            <Button onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                                back
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonClose}>
                            <Button component={Link} to="/eventTicketsList" className={classes.buttonLink} fullWidth variant="contained" >
                                Tickets
                            </Button>
                        </Grid>
                        {(currentProfile.role === "GlobalAdmin") &&
                            <Grid item className={classes.buttonClose}>
                                <Button component={Link} to="/companyDetails" onClick={() => { dispatchCompany(company) }} className={classes.buttonLink} fullWidth variant="contained" >
                                    Company Details
                                </Button>
                            </Grid>}
                        {(currentProfile.role === "CompanyWorker") &&
                            <>
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
                                        <Button onClick={() => { handleSubmit() }} disabled={!enabled} className={classes.buttonEditSave} fullWidth variant="contained"  >
                                            {loading ? (
                                                <CircularProgress size="20px" />
                                            ) : "Save"}
                                        </Button>
                                    </Grid>}
                            </>
                        }
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EventDetailsEdit;


