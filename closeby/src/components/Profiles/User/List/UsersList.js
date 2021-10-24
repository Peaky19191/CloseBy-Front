import React, { useState, useEffect } from "react";
import User from '../../../../api/user'
import useStyles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { Link } from 'react-router-dom'

const UsersList = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const [idUser, setIdUser] = useState('');

    const getList = () => {
        User.getUsersList(page, rowsPerPage)
            .then((response) => {
                const users = response.data.items;
                const totalPages = response.data.count;

                setUsers(users);
                setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

    const deleteFromList = async (id) => {
        await User.deleteUser(id);
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
        <div>
            <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.tableCellTitle}>User</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Email</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Role</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Gender</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((item) => (
                            <TableRow key={item.email} >
                                <TableCell component="th" scope="row">
                                    {item.firstName}    {item.lastName}
                                </TableCell>
                                <TableCell align="center">{item.email}</TableCell>
                                <TableCell align="center">{item.role}</TableCell>
                                <TableCell align="center">{item.gender}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete" size="large" onClick={() => { deleteFromList(item.id) }} >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton component={Link} to="/userDetails" onClick={() => { }} aria-label="edit" size="large" >
                                        <SettingsApplicationsIcon />
                                    </IconButton>
                                </TableCell>
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
            {/* } */}
        </div >
    );
};

export default UsersList;