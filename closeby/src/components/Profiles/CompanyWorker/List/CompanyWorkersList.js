import React, { useState, useEffect } from "react";
import { getUsersListGlAdm } from '../../../../Actions/Profiles/globalAdmin'
import getCompWorkerList from '../../../../Api/companyWorker'
import { useDispatch, useSelector } from "react-redux";
import useStyles from './styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';


const CompanyAdminsList = () => {
    const classes = useStyles();
    const [workersComp, setCompWorkers] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [company, setCompany] = useState(0);
    const [count, setCount] = useState(0);


    const getList = () => {
        getCompWorkerList.getCompanyworkersList(page, rowsPerPage, company)
            .then((response) => {
                const workersComp = response.data.workers;
                const totalPages = response.data.count;

                setCompWorkers(workersComp);
                setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workersComp.map((workers) => (
                        <TableRow key={workers.email} >
                            <TableCell component="th" scope="row">
                                {workers.firstName}    {workers.lastName}
                            </TableCell>
                            <TableCell align="center">{workers.email}</TableCell>
                            <TableCell align="center">{workers.role}</TableCell>
                            <TableCell align="center">{workers.company.name}</TableCell>
                            <TableCell align="center">{workers.gender}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default CompanyAdminsList;