import React, { useState, useEffect } from "react";
import User from '../../../../Services/Profiles/user.service'
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
import { Link } from 'react-router-dom'
import { setUserId } from "../../../../Actions/Profiles/user";
import { useDispatch } from "react-redux";
import { Paper } from '@material-ui/core';
import PopupDeleteProfile from '../../../Popup/PopupDelete/Profile/PopupDeleteProfile';

const UsersList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);


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

    const setIdUser = (id) => {
        dispatch(setUserId(id))
    }

    const [isOpen, setIsOpen] = useState(false);

    const [idUserDelete, setIdUserDelete] = useState();
    const [firstNameDelete, setFirstNameDelete] = useState();
    const [lastNameDelete, setLastNameDelete] = useState();
    const [emailDelete, setEmailDelete] = useState();


    const prepareDelete = (id, firstName, lastName, email) => {
        setIdUserDelete(id);
        setFirstNameDelete(firstName);
        setLastNameDelete(lastName);
        setEmailDelete(email);

        showPopup();
    }

    const showPopup = () => {
        setIsOpen(!isOpen);
    }

    const deleteFromList = async () => {
        await User.deleteUser(idUserDelete);
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
            <TableContainer className={classes.tableContainer} component={Paper} elevation={3} autof >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.tableCellTitle}>User</TableCell>
                            <TableCell align="center" className={classes.tableCellTitle}>Email</TableCell>
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
                                <TableCell align="center">{item.gender}</TableCell>
                                <TableCell align="center">
                                    <IconButton component={Link} to="/userDetails" onClick={() => { setIdUser(item.id) }} aria-label="edit" size="large" >
                                        <SettingsApplicationsIcon className={classes.settingICon} />
                                    </IconButton>
                                    <IconButton aria-label="delete" size="large" onClick={() => { prepareDelete(item.id, item.firstName, item.lastName, item.email) }} >
                                        <DeleteIcon className={classes.deleteICon} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow >
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
            {isOpen && <PopupDeleteProfile handleClose={showPopup} handleDelete={deleteFromList} handleData={["User", firstNameDelete, lastNameDelete, emailDelete]} />}
        </>
    );
};

export default UsersList;