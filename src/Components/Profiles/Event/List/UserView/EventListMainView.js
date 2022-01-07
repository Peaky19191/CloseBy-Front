import React, { useState, useEffect } from "react";
import { Typography, Card, CardActions, CardContent, CardMedia, Grid, Container, Button, Paper } from '@material-ui/core';
import useStyles from './styles';
import Event from '../../../../../Services/Profiles/event.service'
import moment from 'moment'
import { useDispatch } from "react-redux";
import { setEventDispatch, getEventListAllDispatch } from "../../../../../Actions/Profiles/events";
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from "react-redux";

export const Events = () => {
    const classes = useStyles();
    const [listLoaded, setListLoaded] = useState(false);
    const [events, setEvent] = useState([]);
    const [count, setCount] = useState(0);

    const [listMoreLoaded, setListMoreLoaded] = useState(false);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const [disable, setDisable] = useState((events.length === count) ? true : false);

    const getList = () => {
        dispatch(getEventListAllDispatch(page, rowsPerPage))
            .then((response) => {
                console.log("response");
                console.log(response);

                console.log("response.data.items");
                console.log(response.data.items);
                const eventTemp = response.data.items;
                const totalPages = response.data.count;

                if (events.length === 0) {
                    setEvent(eventTemp);
                } else {
                    setEvent([...events, ...eventTemp]);
                }
                setCount(totalPages);
                setListLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

    const loadMore = () => {
        setPage(page + 1);
        setRowsPerPage(rowsPerPage);
    }

    const dispatch = useDispatch();
    const dispatchEvent = (event) => {

        dispatch(setEventDispatch(event))
    }

    return (
        (listLoaded !== true) ?
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid>
            :
            <>
                <main>
                    {/* <div className={classes.container}>
                    <Container maxWidth="md" style={{ marginTop: '100px' }}>
                        <Typography variant="h3" align="center" color="white" gutterBottom>
                            Check out the available Events
                        </Typography>
                    </Container>
                </div> */}
                    <Container className={classes.cardGrid} maxWidth="lg">
                        <Grid container spacing={4}>
                            {events.map((event) => (
                                <Grid item key={event.id} xs={12} sm={6} md={4} >
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="./assets/cover.png"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5">
                                                {event.title}
                                            </Typography>
                                            <Typography>
                                                {moment(event.startDateTime).format('HH:mm - MM/DD/YYYY ')}
                                            </Typography>
                                            <Typography>
                                                {event.type}
                                            </Typography>
                                            <Typography>
                                                {event.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.actionsContainer}>
                                            <Button component={Link} color="primary" to="/eventDetailsView" onClick={() => { dispatchEvent(event) }}>Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Paper className={classes.buttonPaper} >
                            <Button className={classes.buttonLoadMore} onClick={() => { loadMore() }} fullWidth variant="contained" color="primary" disabled={(events.length === count) ? true : false}  >
                                {(events.length === count) ? "No Events" : "Load More"}
                            </Button>
                        </Paper>
                    </Container>
                </main>
            </>
    )
}

export default Events;
