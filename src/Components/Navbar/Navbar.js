import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Grid, Toolbar, Typography, Menu, MenuItem, IconButton, Divider } from '@material-ui/core';
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { history } from "../../Helpers/history";
import { logout } from "../../Actions/auth";
import { clearMessage } from "../../Actions/message";
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../Images/logo2.jpg'

const Navbar = () => {
    const classes = useStyles();
    const [showGlobalAdminBoard, setShowGlobalAdminBoard] = useState(false);
    const [showCompanyAdminBoard, setShowCompanyAdminBoard] = useState(false);
    const [showCompanyWorkerBoard, setShowCompanyWorkerBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);

    const { profile: currentProfile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentProfile && currentProfile.role) {
            setShowUserBoard(currentProfile.role.includes("User"));
            setShowCompanyWorkerBoard(currentProfile.role.includes("CompanyWorker"));
            setShowCompanyAdminBoard(currentProfile.role.includes("CompanyAdmin"));
            setShowGlobalAdminBoard(currentProfile.role.includes("GlobalAdmin"));
        }
    }, [currentProfile]);

    const logOut = () => {
        dispatch(logout());
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        // <AppBar className={classes.appBar} position="static" color="inherit">
        //     <Grid >
        //         <a href="/"><img className={classes.image} src="https://i.imgur.com/Tngx1R2.png" alt="logo" /></a>
        //     </Grid>
        //     <Toolbar className={classes.toolbar}>
        //         {currentProfile && showUserBoard && (
        //             <Grid>
        //                 <Button className={classes.button} component={Link} to="/user" variant="contained" color="primary">Main</Button>
        //             </Grid>
        //         )}
        //         {currentProfile && showCompanyWorkerBoard && (
        //             <Grid>
        //                 <Button className={classes.button} component={Link} to="/compWork" variant="contained" color="primary">Main</Button>
        //             </Grid>
        //         )}
        //         {currentProfile && showCompanyAdminBoard && (
        //             <Grid>
        //                 <Button className={classes.button} component={Link} to="/compAdmin" variant="contained" color="primary">Main</Button>
        //                 <Button className={classes.button} component={Link} to="/compWorkerList" variant="contained" color="primary">Company Worksers List</Button>
        //                 <Button className={classes.button} component={Link} to="/registerCompWorker" variant="contained" color="primary">Register Company Worker</Button>
        //             </Grid>
        //         )}
        //         {currentProfile && showGlobalAdminBoard && (
        //             <Grid>
        //                 <Button className={classes.button} component={Link} to="/globAdmin" variant="contained" color="primary">Main</Button>
        //                 <Button className={classes.button} component={Link} to="/registerCompAdmin" variant="contained" color="primary">Register Company Admin</Button>
        //                 <Button className={classes.button} component={Link} to="/compAdminList" variant="contained" color="primary">Company Admins List</Button>
        //                 <Button className={classes.button} component={Link} to="/usersList" variant="contained" color="primary">Users List</Button>
        //                 <Button className={classes.button} component={Link} to="/registerCompany" variant="contained" color="primary">Register Company</Button>
        //                 <Button className={classes.button} component={Link} to="/companyList" variant="contained" color="primary">Company List</Button>
        //             </Grid>
        //         )}
        //         {currentProfile ? (
        //             <Grid>
        //                 <Button className={classes.button} component={Link} to="/about" variant="contained" color="primary">About</Button>
        //                 <Button className={classes.button} component={Link} to="/contact" variant="contained" color="primary">Contact</Button>
        //                 <Button className={classes.button} component={Link} to="/events" variant="contained" color="primary">Events</Button>
        //                 <Button className={classes.button} component={Link} to="/profile" variant="contained" color="primary">Profile</Button>
        //                 <Button className={classes.button} component={Link} to="/" variant="contained" color="secondary" onClick={logOut}>Logout</Button>
        //             </Grid>
        //         ) : (
        //             <Button className={classes.button} component={Link} to="/login" variant="contained" color="primary">Login</Button>
        //         )}
        //     </Toolbar>
        // </AppBar>
        <Grid className={classes.container}>
            <Grid >
                <a href="/"><img className={classes.logo} src={Logo} alt="website logo"></img></a>
                {/* <a href="/"><img className={classes.image} src="https://i.imgur.com/Tngx1R2.png" alt="logo" /></a> */}
            </Grid>
            <Grid className={classes.menuContainer}>
                <IconButton onClick={handleClick} >
                    <MenuIcon className={classes.icon} />
                </IconButton>
                <Menu classes={{ list: classes.list }} anchorEl={anchorEl} open={open} onClose={handleClose} >
                    {currentProfile && showUserBoard && (
                        <MenuItem onClick={handleClose} component={Link} to="/user" variant="contained" >Main</MenuItem>
                    )}
                    {currentProfile && showCompanyWorkerBoard && (
                        <MenuItem onClick={handleClose} component={Link} to="/compWork" variant="contained" >Main</MenuItem>
                    )}
                    {currentProfile && showCompanyAdminBoard && (
                        <>
                            <MenuItem onClick={handleClose} component={Link} to="/compAdmin" variant="contained" >Main</MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose} component={Link} to="/compWorkerList" variant="contained" >List</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/registerCompWorker" variant="contained" >Register new Worker</MenuItem>
                        </>
                    )}
                    {currentProfile && showGlobalAdminBoard && (
                        <>
                            <MenuItem onClick={handleClose} component={Link} to="/globAdmin" variant="contained" >Main</MenuItem>
                            <Divider />
                            {/* <MenuItem onClick={handleClose} component={Link} to="/registerCompAdmin" variant="contained" >Register Company Admin</MenuItem> */}
                            <MenuItem onClick={handleClose} component={Link} to="/compAdminList" variant="contained" >Admins</MenuItem>
                            {/* <MenuItem onClick={handleClose} component={Link} to="/registerCompany" variant="contained" >Register Company</MenuItem> */}
                            <MenuItem onClick={handleClose} component={Link} to="/companyList" variant="contained" >Companies</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/usersList" variant="contained" >Users</MenuItem>
                        </>
                    )}
                    {currentProfile ? (
                        <>
                            <Divider />
                            <MenuItem onClick={handleClose} component={Link} to="/events" variant="contained" >Events</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/profile" variant="contained" >Profile</MenuItem>
                            <MenuItem className={classes.logout} onClick={handleClose} component={Link} to="/" variant="contained" onClick={logOut}>Logout</MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/about" variant="contained" >About</MenuItem>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/contact" variant="contained" >Contact</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/login" variant="contained" >Login</MenuItem>
                        </>
                    )}
                </Menu>
            </Grid>
        </Grid>
    );
}

export default Navbar;