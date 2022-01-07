import React, { useState, useEffect } from "react";
import { Typography, Card, CardActions, CardContent, CardMedia, Grid, Container, Button, Paper } from '@material-ui/core';
import useStyles from './styles';
import Event from '../../../../../Services/Profiles/event.service'
import moment from 'moment'
import { useDispatch } from "react-redux";
import { setEventDispatch, getEventListAllDispatch, getEventListFavoriteDispatch } from "../../../../../Actions/Profiles/events";
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from "react-redux";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';

export const EventsFavorite = () => {
    const classes = useStyles();
    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [listLoaded, setListLoaded] = useState(false);
    const [events, setEvent] = useState([]);
    const [count, setCount] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const getList = () => {
        dispatch(getEventListFavoriteDispatch(page, rowsPerPage, currentProfile.id))
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
        (listLoaded === true) ?
            <>
                <main>
                    <Container className={classes.cardGrid} maxWidth="lg">
                        <Grid container spacing={4}>
                            {events.map((item) => (
                                <Grid item key={item.event.id} xs={12} sm={6} md={4} >
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="./assets/cover.png"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5">
                                                {item.event.title}
                                            </Typography>
                                            <Typography>
                                                {moment(item.event.startDateTime).format('HH:mm - MM/DD/YYYY ')}
                                            </Typography>
                                            <Typography>
                                                {item.event.type}
                                            </Typography>
                                            <Typography>
                                                {item.event.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.actionsContainer}>
                                            <Button component={Link} color="primary" to="/eventDetailsView" onClick={() => { dispatchEvent(item.event) }}>Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Paper className={classes.buttonPaper} >
                            <Button className={classes.buttonLoadMore} onClick={() => { loadMore() }} fullWidth variant="contained" color="primary" disabled={(events.length === count) ? true : false}  >
                                {(events.length === count) ? "No Favorites Events" : "Load More"}
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

export default EventsFavorite;
