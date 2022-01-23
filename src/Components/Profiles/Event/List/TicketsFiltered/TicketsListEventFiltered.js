import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { getEventTicketsListDispatch, setEventDispatch } from "../../../../../Actions/Profiles/events";
import useStyles from './styles';

const TicketsEventList = () => {
    const classes = useStyles();

    const { event: currentEvent } = useSelector((state) => state.event);
    const [listLoaded, setListLoaded] = useState(false);

    const [event, setEvent] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const getList = () => {
        dispatch(getEventTicketsListDispatch(page, rowsPerPage, currentEvent.id))
            .then((response) => {
                const eventTemp = response.data.items;
                const totalPages = response.data.count;

                setEvent(eventTemp);
                setCount(totalPages);
                // const eventTemp = response.data.items;
                // const totalPages = response.data.count;
                setListLoaded(true);

                // setEvent(eventTemp);
                // setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

    const dispatch = useDispatch();
    const dispatchEvent = (event) => {
        dispatch(setEventDispatch(event))
    }

    const [isOpen, setIsOpen] = useState(false);

    const [idEventDelete, setIdEventDelete] = useState();
    const [eventTitleDelete, setEventTitleDelete] = useState();


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (
        (listLoaded !== true) ?
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid> :
            <>
                <Container className={classes.container}>
                    <Paper className={classes.paper} >
                        <Typography component="h1" variant="h4">Tickets of the Event - {currentEvent.title} </Typography>
                    </Paper>
                </Container>
                <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className={classes.tableCellTitle}>Title</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Ticket ID</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>User</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>User's Name</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>User's Surname</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Quantity</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Payment Status</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {event.map((item) => (
                                <TableRow key={item.id} >
                                    <TableCell component="th" scope="row">{item.ticketPayment.event.title}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.ticketPayment.user.email}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.ticketPayment.user.firstName}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.ticketPayment.user.lastName}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.ticketPayment.quantity}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.ticketPayment.paymentStatus}</TableCell>

                                    <TableCell align="center">
                                        <IconButton component={Link} to="/eventDetailsEdit" onClick={() => { dispatchEvent(item.ticketPayment.event) }} aria-label="edit" size="large" >
                                            <SettingsApplicationsIcon className={classes.settingICon} />
                                        </IconButton>
                                        {/* <IconButton aria-label="delete" size="large" onClick={() => { prepareDelete(item.id, item.title) }} >
                                            <DeleteIcon className={classes.deleteICon} />
                                        </IconButton> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 100]}
                                            component="div"
                                            count={count}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Grid>
                                    <Grid item >
                                        <Button onClick={goToPreviousPath} className={classes.bottomButtonClose}>
                                            back
                                        </Button>
                                    </Grid>
                                </Grid>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </>
    );
};

export default TicketsEventList;