import { Avatar, Button, Container, Grid, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { amber } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToFavoriteDispatch, deleteFromFavoriteDispatch, getEventIdDispatch } from "../../../../../Actions/Profiles/events";
import MapDetailsView from '../../../../Map/DetailsMap/View/DetailsViewMap';
import PopupBuy from '../../../../Popup/PopupBuy/PopupBuy';
import PopupPayment from '../../../../Popup/PopupPayment/PopupPayment';
import useStyles from './styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

const EventDetailsView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { event: currentEvent } = useSelector((state) => state.event);
    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [eventId, setEventId] = useState(currentEvent.id);
    const [title, setTitle] = useState(currentEvent.title);
    const [desc, setDesc] = useState(currentEvent.description);
    const [type, setType] = useState(currentEvent.type);
    // const [status, setStatus] = useState(currentEvent.status);
    const [limit, setLimit] = useState(currentEvent.ticketLimit);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [favorite, setFavorite] = useState("");
    const [ticketPrice, setTicketPrice] = useState(currentEvent.ticketPrice);

    const [quantity, setQuantity] = useState("");

    const changeFavorite = () => {
        if (favorite) {
            dispatch(deleteFromFavoriteDispatch(currentProfile.id, currentEvent.id))
                .then((response) => {
                    setFavorite(false);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            dispatch(addToFavoriteDispatch(currentProfile.id, currentEvent.id))
                .then((response) => {
                    setFavorite(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [idEventBuy, setIdEventBuy] = useState();
    const [eventTitleBuy, setEventTitleBuy] = useState();
    const [eventDescriptionBuy, setEventDescriptionBuy] = useState();
    const [eventTicketPriceBuy, setEventTicketPriceBuy] = useState();
    const [userId, setUserId] = useState();

    const prepareBuy = (idEvent, eventTitle, eventDescription, eventTicketPrice, userId) => {
        setIdEventBuy(idEvent);
        setEventTitleBuy(eventTitle);
        setEventDescriptionBuy(eventDescription);
        setEventTicketPriceBuy(eventTicketPrice);
        setUserId(userId);

        showPopup();
    }

    const callback = useCallback((quantity) => {
        setQuantity(quantity);
        closePopup();
        showPopup2();
    }, []);

    const showPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const showPopup2 = () => {
        setIsOpen2(!isOpen2);
    }

    const getEventDetails = () => {
        dispatch(getEventIdDispatch(eventId, currentProfile.id))
            .then((response) => {
                const event = response.data;
                setFavorite(event.isLiked);
                // setTitle(event.title);
                // setDesc(event.description);
                setStartDate(moment(event.startDateTime).format('MM/DD/YYYY - HH:mm'));
                setEndDate(moment(event.endDateTime).format('MM/DD/YYYY - HH:mm'));
                // setType(event.type);
                // setStatus(event.status);
                // setLimit(event.ticketLimit);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getEventDetails, []);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Grid container className={classes.titleContainer} >
                    <Grid container className={classes.favoriteContainer} >
                        <IconButton onClick={changeFavorite}>
                            {
                                favorite ?
                                    (<StarIcon fontSize="large" sx={{ color: amber[500], fontSize: 60 }} />)
                                    :
                                    (<StarBorderOutlinedIcon fontSize="large" sx={{ color: amber[500], fontSize: 60 }} />)
                            }
                        </IconButton>
                    </Grid>
                    <Grid className={classes.topContainer} >
                        <Avatar className={classes.avatar}>
                            <EventIcon fontSize="large" />
                        </Avatar>

                    </Grid>
                    <Typography className={classes.title} component="h1" variant="h4">Event {title}</Typography>
                </Grid>
                <form >
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
                                        <Slider className={classes.limit} value={limit - currentEvent.ticketsBought} />
                                    </Grid>
                                    <Grid item>
                                        <Input value={limit - currentEvent.ticketsBought} size="small" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Ticket price" fullWidth name="ticketPrice" htmlFor="ticketPrice" variant="outlined" type="text" value={ticketPrice} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">€</InputAdornment>, }} />
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
                                back
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonSubmit}>
                            <Button onClick={() => { prepareBuy(eventId, title, desc, ticketPrice) }} className={classes.buttonEditSave} fullWidth variant="contained"  >
                                Buy ticket
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            {isOpen && <PopupBuy handleClose={closePopup} handleData={[idEventBuy, eventTitleBuy, eventDescriptionBuy, eventTicketPriceBuy]} parentCallback={callback} />}
            {isOpen2 && <PopupPayment handleClose={showPopup2} handleData={[eventId, quantity]} />}
        </Container>
    );
};

export default EventDetailsView;


