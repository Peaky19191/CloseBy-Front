import React, { useState, useEffect } from "react";
import CompanyAdmin from '../../../../api/companyAdmin'
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

const CompanyAdminsList = () => {
    const classes = useStyles();
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

    const deleteFromList = async (id, companyId) => {
        await CompanyAdmin.deleteCompanyAdmin(id, companyId);
        getList();
    }

    const compAdminDetails = async (id) => {
        await CompanyAdmin.getCompanyAdminId(id)
            .then((response) => {
                const users = response.data.items;
                console.log(users)

                // setUsers(users);
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
        <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell className={classes.tableCellTitle}>User</TableCell>
                        <TableCell align="center" className={classes.tableCellTitle}>Email</TableCell>
                        <TableCell align="center" className={classes.tableCellTitle}>Role</TableCell>
                        <TableCell align="center" className={classes.tableCellTitle}>Company</TableCell>
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
                            <TableCell align="center">{item.role}</TableCell>
                            <TableCell align="center">{item.company.name}</TableCell>
                            <TableCell align="center">{item.gender}</TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="delete" size="large">
                                    <DeleteIcon onClick={() => {
                                        deleteFromList(item.id, item.company.id)
                                    }} />
                                </IconButton>
                                <IconButton aria-label="delete" size="large">
                                    <SettingsApplicationsIcon onClick={() => {
                                        compAdminDetails(item.id)
                                    }} />
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
    );
};

export default CompanyAdminsList;