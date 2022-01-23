import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getEventListTicketDispatch, setEventDispatch } from "../../../../../Actions/Profiles/events";
import useStyles from './styles';

export const EventsTickets = () => {
    const classes = useStyles();
    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [listLoaded, setListLoaded] = useState(false);
    const [events, setEvent] = useState([]);
    const [count, setCount] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const getList = () => {
        dispatch(getEventListTicketDispatch(currentProfile.id, page, rowsPerPage))
            .then((response) => {
                const eventTemp = response.data.items;
                console.log(eventTemp);
                const totalPages = response.data.count;

                setEvent(eventTemp);

                setCount(totalPages);
                setListLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

    const getListOnClick = () => {
        dispatch(getEventListTicketDispatch(currentProfile.id, page + 1, rowsPerPage))
            .then((response) => {
                const eventTemp = response.data.items;
                const totalPages = response.data.count;


                setEvent([...events, ...eventTemp]);
                setCount(totalPages);
                setListLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const loadMore = () => {
        getListOnClick();
    }

    const dispatch = useDispatch();
    const dispatchEvent = (event) => {
        dispatch(setEventDispatch(event))
    }

    return (
        (listLoaded === true) ?
            <>
                <main>
                    <Container className={classes.cardGrid} maxWidth="lg">
                        <Grid container spacing={4}>
                            {events.map((item) => (
                                <Grid item key={item.id} xs={12} sm={6} md={4} >
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="./assets/cover.png"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5">
                                                {item.ticketPayment.event.title}
                                            </Typography>
                                            <Typography>
                                                {moment(item.ticketPayment.event.startDateTime).format('HH:mm - MM/DD/YYYY ')}
                                            </Typography>
                                            <Typography>
                                                {item.ticketPayment.event.type}
                                            </Typography>
                                            <Typography>
                                                {item.ticketPayment.event.description}
                                            </Typography>
                                            <Typography>
                                                Quantity: {item.ticketPayment.quantity}
                                            </Typography>
                                            <Typography>
                                                Ticket ID: {item.id}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.actionsContainer}>
                                            <Button className={classes.buttonAction} fullWidth variant="contained" color="primary" component={Link} to="/eventDetailsView" onClick={() => { dispatchEvent(item.ticketPayment.event) }}>Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Paper className={classes.buttonPaper} >
                            <Button className={classes.buttonLoadMore} onClick={() => { loadMore() }} fullWidth variant="contained" color="primary" disabled={(events.length === count) ? true : false}  >
                                {(events.length === count) ? "No tickets" : "Load More"}
                            </Button>
                        </Paper>
                    </Container>
                </main>
            </>
            :
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid>
    )
}

export default EventsTickets;
