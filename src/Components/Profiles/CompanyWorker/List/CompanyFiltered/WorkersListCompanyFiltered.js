import React, { useState, useEffect } from "react";
import CompWorker from '../../../../../Services/Profiles/companyWorker.service'
import CompAdmin from '../../../../../Services/Profiles/companyAdmin.service'
import useStyles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import { useSelector } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import PopupDeleteProfile from '../../../../Popup/PopupDelete/Profile/PopupDeleteProfile';
import { setCompWorkerId } from "../../../../../Actions/Profiles/companyWorker";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CompanyWorkersList = () => {
    const classes = useStyles();

    const { company: currentCompany } = useSelector((state) => state.company);

    const [compWorkers, setCompWorkers] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const getList = () => {
        CompWorker.getCompanyWorkersList(page, rowsPerPage, currentCompany.id)
            .then((response) => {
                const compWorkers = response.data.items;
                const totalPages = response.data.count;

                setCompWorkers(compWorkers);
                setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);


    const dispatch = useDispatch();

    const setIdCompWorker = (id) => {
        dispatch(setCompWorkerId(id))
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


    const deleteFromList = async () => {
        await CompWorker.deleteCompanyWorker(idUserDelete, idCompanyDelete);
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

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (
        <>
            <Container className={classes.container}>
                <Paper className={classes.paper} >
                    <Typography component="h1" variant="h4">Workers of the Company - {currentCompany.name} </Typography>
                </Paper>
            </Container>
            <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.tableCellTitle}>User</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Email</TableCell>
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
                                <TableCell align="center">{item.gender}</TableCell>
                                <TableCell align="center">
                                    <IconButton component={Link} to="/compWorkerDetails" onClick={() => { setIdCompWorker(item.id) }} aria-label="edit" size="large" >
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
                                <Grid item >
                                    <Button onClick={goToPreviousPath} className={classes.bottomButtonClose}>
                                        Close
                                    </Button>
                                </Grid>
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