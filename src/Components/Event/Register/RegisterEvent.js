import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField, MenuItem } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom'
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

const Input = styled(MuiInput)`
  width: 42px;
`;

const RegEvent = () => {

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const classes = useStyles();

    const [successful, setSuccessful] = useState(false);
    const [errors, setErrors] = useState({});

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const [limit, setLimit] = useState("10");

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

    const [type, setType] = useState("");

    const onChangeType = (e) => {
        const type = e.target.value;
        setType(type);
    };

    const [desc, setDesc] = useState("");

    const onChangeDesc = (e) => {
        const desc = e.target.value;
        setDesc(desc);
    };

    const [companyId, setCompanyId] = useState("");
    useEffect(() => {
        CompWorker.getCompanyWorkerId(currentProfile.id)
            .then((response) => {
                const compId = response.data.company.id;
                setCompanyId(compId);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    // const startDate = new Date();
    // const startDate = "2021-11-06T12:21:52";
    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    // const [startDate, setStartDate] = React.useState('2021-11-06T12:21:52');
    // const [startDate, setStartDate] = useState("2021-11-06T12:21:52");
    var re = new RegExp('^.{0,24}');

    const onChangeDate = (e) => {
        // console.log("e");
        // console.log(e);
        const startDate = e;
        console.log(startDate);
        setStartDate(e);

    };

    // const startDate = new Date(2020-01-01T05:30:01);
    // 'YYYY-MM-DDTHH:mm:ss'
    // const { loc_: loc_lat } = useSelector((state) => state.auth);

    const loc_lat = useSelector(state => ((state.event.event_loc !== undefined) ? state.event.event_loc.lat : ""));
    const loc_lng = useSelector(state => ((state.event.event_loc !== undefined) ? state.event.event_loc.lng : ""));
    // const [loc_lat, setLoc_lat] = useState("");
    // const [loc_lng, setLoc_lng] = useState("");


    const status = "Added";

    const handleSubmit = (e) => {
        console.log("startDate");

        console.log(startDate);

        e.preventDefault();

        setSuccessful(false);
        dispatch(regEvent(name, companyId, loc_lat, loc_lng, startDate, status, desc, limit, type))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };


    return (
        <Container className={classes.container}  >
            <Paper className={classes.paper} elevation={3}>
                <Grid container className={classes.titleContainer} >
                    <Avatar className={classes.avatar}>
                        <EventIcon />
                    </Avatar>
                    <Typography className={classes.title} component="h1" variant="h4">Register Event</Typography>
                    {successful ?
                        <Alert className={classes.alert} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            <strong>You have successfully added your event</strong>
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
                                <TextField label="Name of the Event" fullWidth name="name" htmlFor="name" variant="outlined" type="text" value={name} onChange={onChangeName} autoFocus />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            format="yyyy-MM-dd HH:mm:ss"
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Start Date and Hour"
                                            value={startDate}
                                            onChange={(newValue) => {
                                                console.log(newValue);
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
                                            value={typeof limit === 'number' ? limit : 0}
                                            onChange={handleSliderChange}
                                            aria-labelledby="input-slider"
                                            color="primary"

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
                                <TextField label="Description" rows={10} multiline fullWidth name="desc" htmlFor="desc" variant="outlined" type="text" value={desc} onChange={onChangeDesc} />
                            </Grid>
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
                            <Button type="submit" fullWidth variant="contained" color="primary" >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default RegEvent;
