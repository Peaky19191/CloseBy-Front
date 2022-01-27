import { Button, Card, CardActions, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getEventListTicketDispatch, setTicketDispatch } from "../../../../../../Actions/Profiles/events";
import useStyles from './styles';

export const EventsTickets = () => {
    const classes = useStyles();
    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [listLoaded, setListLoaded] = useState(false);
    const [events, setEvent] = useState([]);
    const [count, setCount] = useState(0);
    // eslint-disable-next-line
    const [page, setPage] = useState(0);
    // eslint-disable-next-line
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const getList = () => {
        dispatch(getEventListTicketDispatch(currentProfile.id, page, rowsPerPage))
            .then((response) => {
                const eventTemp = response.data.items;
                const totalPages = response.data.count;

                setEvent(eventTemp);

                setCount(totalPages);
                setListLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);// eslint-disable-line react-hooks/exhaustive-deps

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

    const dispatchTicket = (ticket) => {
        dispatch(setTicketDispatch(ticket))
    }

    return (
        (listLoaded === true) ?
            <>
                <main>
                    <Container maxWidth="lg">
                        <Grid container className={classes.container} spacing="3">
                            <Paper className={classes.paper} >
                                <Typography component="h1" variant="h5">Your tickets</Typography>
                            </Paper>
                            {events.map((item) => (
                                <Grid item key={item.id}>
                                    <Card className={classes.card} >
                                        {/* <CardMedia
                                            className={classes.cardMedia}
                                            image="./assets/cover.png"
                                        /> */}
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" className={classes.textBox}>
                                                {item.ticketPayment.event.title}
                                            </Typography>
                                            <Typography className={classes.textBox}>
                                                Date: {moment(item.ticketPayment.event.startDateTime).format('HH:mm - MM/DD/YYYY ')}
                                            </Typography>
                                            {/* <Typography className={classes.textBox}>
                                                Event type: {item.ticketPayment.event.type}
                                            </Typography> */}
                                            {/* <Typography className={classes.textBox}>
                                                Description: {item.ticketPayment.event.description}
                                            </Typography> */}
                                            <Typography className={classes.textBox}>
                                                Quantity: {item.ticketPayment.quantity}
                                            </Typography>
                                            <Typography className={classes.textBox}>
                                                Ticket ID: {item.id}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ gridColumn: '1 / 5' }} className={classes.actionsContainer}>
                                            <Button className={classes.buttonAction} fullWidth variant="contained" color="primary" component={Link} to="/ticketDetails" onClick={() => { dispatchTicket(item) }}>Ticket Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Paper className={classes.buttonPaper} >
                            <Button className={classes.buttonLoadMore} onClick={() => { loadMore() }} fullWidth variant="contained" color="primary" disabled={(events.length === count) ? true : false}  >
                                {(events.length === count) ? "No more tickets to load" : "Load More"}
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
