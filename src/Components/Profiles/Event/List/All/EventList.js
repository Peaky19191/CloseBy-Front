import { Button, Grid, Paper } from '@material-ui/core';
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
import { Link } from 'react-router-dom';
import { getCompAdminIdDispatch } from "../../../../../Actions/Profiles/companyAdmin";
import { getCompWorkerIdDispatch } from "../../../../../Actions/Profiles/companyWorker";
import { deleteEventDispatch, getEventListAllDispatch, setEventDispatch } from "../../../../../Actions/Profiles/events";
import PopupDeleteEvent from '../../../../Popup/PopupDelete/Event/PopupDeleteEvent';
import useStyles from './styles';

const EventList = () => {
    const classes = useStyles();
    const [listLoaded, setListLoaded] = useState(false);

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [event, setEvent] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const getList = () => {
        if (currentProfile.role === "GlobalAdmin") {
            getEventList();
        }
        if (currentProfile.role === "CompanyAdmin") {
            dispatch(getCompAdminIdDispatch(currentProfile.id))
                .then((response) => {
                    const compId = response.data.company.id;

                    getEventListId(compId);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        if (currentProfile.role === "CompanyWorker") {
            dispatch(getCompWorkerIdDispatch(currentProfile.id))
                .then((response) => {
                    const compId = response.data.company.id;

                    getEventListId(compId);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    useEffect(getList, [page, rowsPerPage]);// eslint-disable-line react-hooks/exhaustive-deps

    const getEventListId = (companyId) => {
        dispatch(getEventListAllDispatch(page, rowsPerPage, companyId))
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
    }

    const getEventList = () => {
        dispatch(getEventListAllDispatch(page, rowsPerPage))
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
    }

    const dispatch = useDispatch();
    const dispatchEvent = (event) => {
        dispatch(setEventDispatch(event))
    }

    const [isOpen, setIsOpen] = useState(false);

    const [idEventDelete, setIdEventDelete] = useState();
    const [eventTitleDelete, setEventTitleDelete] = useState();
    const [eventCompanyDelete, setEventCompanyDelete] = useState();
    const [eventStatusDelete, setEventStatusDelete] = useState();


    const prepareDelete = (idEvent, eventTitle, companyName, status) => {
        setIdEventDelete(idEvent);
        setEventTitleDelete(eventTitle);
        setEventCompanyDelete(companyName);
        setEventStatusDelete(status);

        showPopup();
    }

    const showPopup = () => {
        setIsOpen(!isOpen);
    }

    const deleteFromList = () => {
        console.log(idEventDelete);
        dispatch(deleteEventDispatch(idEventDelete))
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

    const isCompanyWorker = currentProfile.role === "CompanyAdmin" || currentProfile.role === "CompanyWorker";

    return (
        (listLoaded !== true) ?
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid> :
            <>
                <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className={classes.tableCellTitle}>Title</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Type</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Status</TableCell>
                                {(currentProfile.role === "GlobalAdmin") && <TableCell align="center" className={classes.tableCellTitle}>Company</TableCell>}
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
                                    {(currentProfile.role === "GlobalAdmin") && <TableCell align="center" component="th" scope="row">{item.company.name}</TableCell>}
                                    <TableCell align="center">{moment(item.startDateTime).format('MM/DD/YYYY HH:mm')}</TableCell>
                                    <TableCell align="center">{moment(item.endDateTime).format('MM/DD/YYYY HH:mm')}</TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} to="/eventDetailsEdit" onClick={() => { dispatchEvent(item) }} aria-label="edit" size="large" >
                                            <SettingsApplicationsIcon className={classes.settingICon} />
                                        </IconButton>
                                        {isCompanyWorker &&
                                            <IconButton aria-label="delete" size="large" onClick={() => { prepareDelete(item.id, item.title, item.company.name, item.status) }} >
                                                <DeleteIcon className={classes.deleteICon} />
                                            </IconButton>
                                        }
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
                                    {(currentProfile.role === "CompanyWorker") &&
                                        <Grid item >
                                            <Button component={Link} to="/registerEvent" className={classes.bottomButton}>
                                                Register new event
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                {isOpen && <PopupDeleteEvent handleClose={showPopup} handleDelete={deleteFromList} handleData={["Event", eventTitleDelete, eventCompanyDelete, eventStatusDelete]} />}
            </>
    );
};

export default EventList;