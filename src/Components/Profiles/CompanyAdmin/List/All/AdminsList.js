import React, { useState, useEffect } from "react";
import CompanyAdmin from '../../../../../Services/Profiles/companyAdmin.service'
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
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import PopupDelete from '../../../../Popup/PopupDelete/PopupDelete';
import { setCompAdminId } from "../../../../../Actions/Profiles/companyAdmin";
import { useDispatch, useSelector } from "react-redux";

const CompanyAdminsList = () => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const [adminsComp, setAdminsComp] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);


    const getList = () => {
        CompanyAdmin.getCompanyAdminsList(page, rowsPerPage)
            .then((response) => {
                const adminsComp = response.data.items;
                const totalPages = response.data.count;

                setAdminsComp(adminsComp);
                setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

    const dispatch = useDispatch();

    const setIdCompAdmin = (id) => {
        dispatch(setCompAdminId(id))
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
        await CompanyAdmin.deleteCompanyAdmin(idUserDelete, idCompanyDelete);
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
                            <TableCell className={classes.tableCellTitle}>Admin</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Email</TableCell>
                            {(currentProfile.role === "GlobalAdmin") && <TableCell align="center" className={classes.tableCellTitle}>Company</TableCell>}
                            <TableCell align="center" className={classes.tableCellTitle}>Gender</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminsComp.map((item) => (
                            <TableRow key={item.email} >
                                <TableCell component="th" scope="row">
                                    {item.firstName}    {item.lastName}
                                </TableCell>
                                <TableCell align="center">{item.email}</TableCell>
                                {(currentProfile.role === "GlobalAdmin") && <TableCell align="center">{item.company.name}</TableCell>}
                                <TableCell align="center">{item.gender}</TableCell>
                                <TableCell align="center">
                                    <IconButton component={Link} to="/compAdminDetails" onClick={() => { setIdCompAdmin(item.id) }} aria-label="edit" size="large" >
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
                                    <Button component={Link} to="/registerCompAdmin" className={classes.bottomButton}>
                                        Register new admin
                                    </Button>
                                </Grid>
                            </Grid>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {isOpen && <PopupDelete handleClose={showPopup} handleDelete={deleteFromList} handleData={["Admin", firstNameDelete, lastNameDelete, emailDelete, compNameDelete]} />}
        </>
    );
};

export default CompanyAdminsList;