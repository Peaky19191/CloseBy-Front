import React, { useState, useEffect } from "react";
import { getUsersListGlAdm } from '../../../actions/globAdmin'
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


const UserList = () => {
    const classes = useStyles();
    const users = useSelector(state => state.userListGlAdm);
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        console.log(event)
        console.log(newPage)
        console.log("22")

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log(event)
        console.log("33")

        setRowsPerPage(5);
        setPage(0);
    };

    useEffect(() => {
        console.log("1111")
        dispatch(getUsersListGlAdm(page, rowsPerPage));
    }, []);

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
                    {users.map((user) => (
                        <TableRow key={user.email} >
                            <TableCell component="th" scope="row">
                                {user.firstName}    {user.lastName}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                            <TableCell align="center">{user.company.name}</TableCell>
                            <TableCell align="center">{user.gender}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={useState(handleChangePage)}
                            onRowsPerPageChange={useState(handleChangeRowsPerPage)}
                        />
                        <button onClick={() => setPage(page + 1)}>
                            Kliknij mnie
                        </button>
                        <button onClick={() => setPage(page - 1)}>
                            Kliknij mnie
                        </button>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default UserList;