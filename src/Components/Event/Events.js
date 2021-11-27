import React, { useState, useEffect } from "react";
import { Typography, Card, CardActions, CardContent, CardMedia, Grid, Container, Button } from '@material-ui/core';
import useStyles from './styles';
import CompAdmin from '../../Services/Profiles/companyAdmin.service'
import CompWorker from '../../Services/Profiles/companyWorker.service'
import { useSelector } from "react-redux";
import Event from '../../Services/Profiles/event.service'
import moment from 'moment'

export const Events = () => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [event, setEvent] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [count, setCount] = useState(0);

    const getList = () => {
        if (currentProfile.role === "User") {
            getEventListId();
        }
        if (currentProfile.role === "GlobalAdmin") {
            getEventListId();
        }
        if (currentProfile.role === "CompanyAdmin") {
            CompAdmin.getCompanyAdminId(currentProfile.id)
                .then((response) => {
                    const compId = response.data.company.id;

                    getEventListId(compId);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        if (currentProfile.role === "CompanyWorker") {
            CompWorker.getCompanyWorkerId(currentProfile.id)
                .then((response) => {
                    const compId = response.data.company.id;

                    getEventListId(compId);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    useEffect(getList, [page, rowsPerPage]);

    const getEventListId = (companyId) => {
        Event.getEventsList(page, rowsPerPage, companyId)
            .then((response) => {
                const eventTemp = response.data.items;
                const totalPages = response.data.count;
                console.log(eventTemp);
                setEvent(eventTemp);
                setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
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
                        {event.map((event) => (
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
                                            {moment(event.startDateTime).format('HH:mm - DD/MM/YYYY ')}
                                        </Typography>
                                        <Typography>
                                            {event.type}
                                        </Typography>
                                        <Typography>
                                            {event.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button color="primary">Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </main>

        </>
    )
}

export default Events;
