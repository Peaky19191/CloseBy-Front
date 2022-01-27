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
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { deleteEventDispatch, getEventListAllDispatch, setEventDispatch } from "../../../../../Actions/Profiles/events";
import PopupDeleteEvent from '../../../../Popup/PopupDelete/Event/PopupDeleteEvent';
import useStyles from './styles';

const EventList = () => {
    const classes = useStyles();

    const { company: currentCompany } = useSelector((state) => state.company);
    const [listLoaded, setListLoaded] = useState(false);

    const [event, setEvent] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const getList = () => {
        dispatch(getEventListAllDispatch(page, rowsPerPage, currentCompany.id))
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

    useEffect(getList, [page, rowsPerPage]);// eslint-disable-line react-hooks/exhaustive-deps

    const dispatch = useDispatch();
    const dispatchEvent = (event) => {
        dispatch(setEventDispatch(event))
    }

    const [isOpen, setIsOpen] = useState(false);

    const [idEventDelete, setIdEventDelete] = useState();
    const [eventTitleDelete, setEventTitleDelete] = useState();


    const prepareDelete = (idEvent, eventTitle) => {
        setIdEventDelete(idEvent);
        setEventTitleDelete(eventTitle);

        showPopup();
    }

    const showPopup = () => {
        setIsOpen(!isOpen);
    }

    const deleteFromList = () => {
        deleteEventDispatch(idEventDelete)
            .then(() => {
                showPopup();
                getList();
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
                        <Typography component="h1" variant="h4">Events of the Company - {currentCompany.name} </Typography>
                    </Paper>
                </Container>
                <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className={classes.tableCellTitle}>Title</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Type</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Status</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Start At</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>End At</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {event.map((item) => (
                                <TableRow key={item.id} >
                                    <TableCell component="th" scope="row">{item.title}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.type}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{item.status}</TableCell>
                                    <TableCell align="center">{moment(item.startDateTime).format('MM/DD/YYYY HH:mm')}</TableCell>
                                    <TableCell align="center">{moment(item.endDateTime).format('MM/DD/YYYY HH:mm')}</TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} to="/eventDetailsEdit" onClick={() => { dispatchEvent(item) }} aria-label="edit" size="large" >
                                            <SettingsApplicationsIcon className={classes.settingICon} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={() => { prepareDelete(item.id, item.title) }} >
                                            <DeleteIcon className={classes.deleteICon} />
                                        </IconButton>
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
                {isOpen && <PopupDeleteEvent handleClose={showPopup} handleDelete={deleteFromList} handleData={["Event", eventTitleDelete]} />}
            </>
    );
};

export default EventList;