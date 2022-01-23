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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getCompAdminIdDispatch } from "../../../../../Actions/Profiles/companyAdmin";
import { deleteCompWorkerDispatch, getCompWorkerListDispatch, setCompWorker } from "../../../../../Actions/Profiles/companyWorker";
import PopupDeleteProfile from '../../../../Popup/PopupDelete/Profile/PopupDeleteProfile';
import useStyles from './styles';

const CompanyWorkersList = () => {
    const dispatch = useDispatch();

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const classes = useStyles();

    const [listLoaded, setListLoaded] = useState(false);
    const [compWorkers, setCompWorkers] = useState([]);

    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getList = () => {
        if (currentProfile.role === "GlobalAdmin") {
            getCompWorkersListId();
        }
        if (currentProfile.role === "CompanyAdmin") {
            dispatch(getCompAdminIdDispatch(currentProfile.id))
                .then((response) => {
                    const compId = response.data.company.id;

                    getCompWorkersListId(compId);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    useEffect(getList, [page, rowsPerPage]);// eslint-disable-line react-hooks/exhaustive-deps

    const getCompWorkersListId = (companyId) => {
        dispatch(getCompWorkerListDispatch(page, rowsPerPage, companyId))
            .then((response) => {
                const compWorkers = response.data.items;
                const totalPages = response.data.count;

                setCompWorkers(compWorkers);
                setCount(totalPages);
                setListLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const dispatchCompWorker = (compWorker) => {
        dispatch(setCompWorker(compWorker))
    }

    const [isOpen, setIsOpen] = useState(false);

    const [idUserDelete, setIdUserDelete] = useState();
    const [idCompanyDelete, setIdCompanyDelete] = useState();
    const [firstNameDelete, setFirstNameDelete] = useState();
    const [lastNameDelete, setLastNameDelete] = useState();
    const [emailDelete, setEmailDelete] = useState();
    const [compNameDelete, setCompNameDelete] = useState();


    const prepareDelete = (id, idComp, firstName, lastName, email, compName) => {
        setIdUserDelete(id);
        setIdCompanyDelete(idComp);
        setFirstNameDelete(firstName);
        setLastNameDelete(lastName);
        setEmailDelete(email);
        setCompNameDelete(compName);

        showPopup();
    }

    const showPopup = () => {
        setIsOpen(!isOpen);
    }


    const deleteFromList = () => {
        dispatch(deleteCompWorkerDispatch(idUserDelete, idCompanyDelete))
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
    return (
        (listLoaded !== true) ?
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid> :
            <>
                <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell className={classes.tableCellTitle}>User</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Email</TableCell>
                                {(currentProfile.role === "GlobalAdmin") && <TableCell align="center" className={classes.tableCellTitle}>Company</TableCell>}
                                <TableCell align="center" className={classes.tableCellTitle}>Gender</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {compWorkers.map((item) => (
                                <TableRow key={item.email} >
                                    <TableCell component="th" scope="row">
                                        {item.firstName}    {item.lastName}
                                    </TableCell>
                                    <TableCell align="center">{item.email}</TableCell>
                                    {(currentProfile.role === "GlobalAdmin") && <TableCell align="center">{item.company.name}</TableCell>}
                                    <TableCell align="center">{item.gender}</TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} to="/compWorkerDetails" onClick={() => { dispatchCompWorker(item) }} aria-label="edit" size="large" >
                                            <SettingsApplicationsIcon className={classes.settingICon} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={() => { prepareDelete(item.id, item.company.id, item.firstName, item.lastName, item.email, item.company.name) }} >
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
                                    {(currentProfile.role === "CompanyAdmin") &&
                                        <Grid item >
                                            <Button component={Link} to="/registerCompWorker" className={classes.bottomButtonRegister}>
                                                Register new worker
                                            </Button>
                                        </Grid>}
                                </Grid>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer >
                {isOpen && <PopupDeleteProfile handleClose={showPopup} handleDelete={deleteFromList} handleData={["Worker", firstNameDelete, lastNameDelete, emailDelete, compNameDelete]} />}
            </>
    );
};

export default CompanyWorkersList;