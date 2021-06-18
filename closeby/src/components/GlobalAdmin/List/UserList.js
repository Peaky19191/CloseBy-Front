import React, { useState, useEffect } from "react";
import { getUsersListGlAdm } from '../../../actions/globAdmin'
import { useDispatch, useSelector } from "react-redux";
import useStyles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const UserList = () => {
    const classes = useStyles();
    const users = useSelector(state => state.userListGlAdm);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersListGlAdm());
        console.log(users);
    }, []);


    return (
        <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell>User</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Company</TableCell>
                        <TableCell align="center">Gender</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user}>
                            <TableCell component="th" scope="row">
                                {user.firstName}    {user.lastName}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                            <TableCell align="center">Placeholder</TableCell>
                            <TableCell align="center">{user.gender}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default UserList;


{/* <Grid >
    {users.map((user) => (
        <Grid item key={user} >
            <Typography gutterBottom variant="h5">
                {user.firstName}    {user.lastName}
            </Typography>
            <Typography>
                Email: {user.email}    Role: {user.role}
            </Typography>
        </Grid>
    ))}
</Grid> */}

{/* <div>
            <div>
                <h3>Users List</h3>
            </div>
            <div >
                <Container className={classes.itemList} maxWidth="xl">
                    <List >
                        {users.map((user) => (
                            <ListItem
                                key={user}
                                // dense
                                button
                                onClick={""}
                            >
                                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                                <ListItemText secondary={`Email: ${user.email}`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">
                                        <CommentIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </div>
        </div> */}