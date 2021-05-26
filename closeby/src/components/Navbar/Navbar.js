import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { history } from "../../helpers/history";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";

const Navbar = () => {
    const classes = useStyles();
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        // if (currentUser) {
        //   setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
        //   setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        // }
    }, [currentUser]);

    const logOut = () => {
        dispatch(logout());
    };


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer} >
                <img className={classes.image} src="https://i.imgur.com/Tngx1R2.png" alt="logo" />
                {/* <Typography component={Link} to="/" className={classes.heading} variant="h4" align="left" color="primary">Find or create your own event!</Typography> */}
            </div>
            <Toolbar className={classes.toolbar}>
                {currentUser ? (
                    <div className={classes.profile}>
                        {/* <Avatar className={classes.purple} alt={user.result.name} src={user.result.image}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography> */}
                        <Button component={Link} to="/about" variant="contained" color="primary">About</Button>
                        <Button component={Link} to="/contact" variant="contained" color="primary">Contact</Button>
                        <Button component={Link} to="/events" variant="contained" color="primary">Events</Button>
                        {/* <Button component={Link} to="/profile" variant="contained" color="primary">Sign In</Button> */}
                        <Button component={Link} to="/" variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;