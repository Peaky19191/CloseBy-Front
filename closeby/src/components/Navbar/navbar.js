import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { history } from "../../helpers/history";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";

const Navbar = () => {
    const classes = useStyles();
    const [showGlobalAdminBoard, setShowGlobalAdminBoard] = useState(false);
    const [showCompanyAdminBoard, setShowCompanyAdminBoard] = useState(false);

    const { profile: currentProfile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentProfile && currentProfile.role) {
            setShowCompanyAdminBoard(currentProfile.role.includes("CompanyAdmin"));

            setShowGlobalAdminBoard(currentProfile.role.includes("GlobalAdmin"));
        }
    }, [currentProfile]);

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Grid >
                <a href="/"><img className={classes.image} src="https://i.imgur.com/Tngx1R2.png" alt="logo" /></a>
            </Grid>
            <Toolbar className={classes.toolbar}>
                {currentProfile && showCompanyAdminBoard && (
                    <Grid>
                        <Button className={classes.button} component={Link} to="/compWorkerList" variant="contained" color="primary">Company Worksers List</Button>
                        <Button className={classes.button} component={Link} to="/reigsterCompWorker" variant="contained" color="primary">Register Company Worker</Button>
                        {/* <Button className={classes.button} component={Link} to="/usersList" variant="contained" color="primary">Users List</Button> */}
                    </Grid>
                )}
                {currentProfile && showGlobalAdminBoard && (
                    <Grid>
                        <Button className={classes.button} component={Link} to="/globAdmin" variant="contained" color="primary">Main</Button>
                        <Button className={classes.button} component={Link} to="/reigsterCompAdmin" variant="contained" color="primary">Register Company Admin</Button>
                        <Button className={classes.button} component={Link} to="/compAdminList" variant="contained" color="primary">Company Admins List</Button>
                        <Button className={classes.button} component={Link} to="/usersList" variant="contained" color="primary">Users List</Button>
                        <Button className={classes.button} component={Link} to="/reigsterCompany" variant="contained" color="primary">Register Company</Button>
                        <Button className={classes.button} component={Link} to="/companyList" variant="contained" color="primary">Company List</Button>

                    </Grid>
                )}
                {currentProfile ? (
                    <Grid>
                        <Button className={classes.button} component={Link} to="/about" variant="contained" color="primary">About</Button>
                        <Button className={classes.button} component={Link} to="/contact" variant="contained" color="primary">Contact</Button>
                        <Button className={classes.button} component={Link} to="/events" variant="contained" color="primary">Events</Button>
                        <Button className={classes.button} component={Link} to="/profile" variant="contained" color="primary">Profile</Button>
                        <Button className={classes.button} component={Link} to="/" variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                    </Grid>
                ) : (
                    <Button className={classes.button} component={Link} to="/login" variant="contained" color="primary">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;