import React, { useState, useEffect } from "react";
import Event from '../../../Api/events'
import useStyles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import PopupDelete from '../../Popup/PopupDelete/PopupDelete';
import { setEventId } from "../../../Actions/Profiles/events";
import { useDispatch } from "react-redux";
import CompAdmin from '../../../Api/companyAdmin'
import CompWorker from '../../../Api/companyWorker'
import { useSelector } from "react-redux";
import moment from 'moment'

const EventList = () => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [event, setEvent] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const getList = () => {
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

                setEvent(eventTemp);
                setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const dispatch = useDispatch();
    const setIdEvent = (id) => {
        dispatch(setEventId(id))
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

    const deleteFromList = async () => {
        await Event.deleteEvent(idEventDelete);
        showPopup();
        getList();
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
            <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.tableCellTitle}>Title</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Type</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Status</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Start At</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {event.map((item) => (
                            <TableRow key={item.id} >
                                <TableCell component="th" scope="row">{item.title}</TableCell>
                                <TableCell align="center" component="th" scope="row">{item.type}</TableCell>
                                <TableCell align="center" component="th" scope="row">{item.status}</TableCell>
                                <TableCell align="center">{moment(item.startDateTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                                <TableCell align="center">
                                    <IconButton component={Link} to="/eventDetails" onClick={() => { setIdEvent(item.id) }} aria-label="edit" size="large" >
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
                                    <Button component={Link} to="/registerEvent" className={classes.bottomButton}>
                                        Register new event
                                    </Button>
                                </Grid>
                            </Grid>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {isOpen && <PopupDelete handleClose={showPopup} handleDelete={deleteFromList} handleData={["Event", eventTitleDelete]} />}
        </>
    );
};

export default EventList;