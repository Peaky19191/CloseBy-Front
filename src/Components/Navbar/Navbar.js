import { Divider, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import PersonIconEmpty from '@mui/icons-material/PersonOutline';
import StarIcon from '@mui/icons-material/Star';
import StorageIcon from '@mui/icons-material/Storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../../Actions/auth";
import { clearMessage } from "../../Actions/message";
import { history } from "../../Helpers/history";
import Logo from '../../Images/logo2.jpg';
import useStyles from './styles';

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
        setAnchorEl(null);
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
        <Grid className={classes.container} >
            <Grid >
                <a href="/"><img className={classes.logo} src={Logo} alt="website logo"></img></a>
            </Grid>
            <Grid className={classes.menuContainer}>
                <IconButton onClick={handleClick} >
                    <MenuIcon className={classes.icon} />
                </IconButton>
                <Menu anchorEl={anchorEl}
                    open={open}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    classes={{ list: classes.list }}
                >
                    {currentProfile && showUserBoard && (
                        <div>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/favorites" variant="contained" >
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>Favorites</MenuItem>
                            <Divider />
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/events" variant="contained" >
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>Events</MenuItem>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/tickets" variant="contained" >
                                <ListItemIcon>
                                    <LocalOfferIcon />
                                </ListItemIcon>Tickets</MenuItem>
                        </div>
                    )}
                    {currentProfile && showCompanyWorkerBoard && (
                        <div>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/eventList" variant="contained" >
                                <ListItemIcon>
                                    <StorageIcon />
                                </ListItemIcon>Events</MenuItem>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/registerEvent" variant="contained" >
                                <ListItemIcon>
                                    <AddCircleOutlineIcon />
                                </ListItemIcon>Add</MenuItem>
                        </div>
                    )}
                    {currentProfile && showCompanyAdminBoard && (
                        <div>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/eventList" variant="contained" >
                                <ListItemIcon>
                                    <StorageIcon />
                                </ListItemIcon>Events</MenuItem>
                            <Divider />
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/compWorkerList" variant="contained" >
                                <ListItemIcon>
                                    <PeopleAltIcon />
                                </ListItemIcon>Workers</MenuItem>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/registerCompWorker" variant="contained" >
                                <ListItemIcon>
                                    <PersonAdd />
                                </ListItemIcon>Add</MenuItem>
                        </div>
                    )}
                    {currentProfile && showGlobalAdminBoard && (
                        <div>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/eventList" variant="contained" >
                                <ListItemIcon>
                                    <StorageIcon />
                                </ListItemIcon>Events</MenuItem>
                            <Divider />
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/companyList" variant="contained" >
                                <ListItemIcon>
                                    <BusinessIcon />
                                </ListItemIcon>Companies</MenuItem>
                            <Divider />
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/compAdminList" variant="contained" >
                                <ListItemIcon>
                                    <ManageAccountsIcon />
                                </ListItemIcon>Admins</MenuItem>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/compWorkerList" variant="contained" >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>Workers</MenuItem>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/usersList" variant="contained" >
                                <ListItemIcon>
                                    <PersonIconEmpty />
                                </ListItemIcon>Users</MenuItem>
                        </div>
                    )}
                    {currentProfile ? (
                        <div>
                            <Divider />
                            {currentProfile && !showGlobalAdminBoard && // Global Adin doesnt need to see settings on his own account
                                (<MenuItem className={classes.main} onClick={handleClose} component={Link} to="/profile" variant="contained" >
                                    <ListItemIcon>
                                        <SettingsIcon />
                                    </ListItemIcon>Profile</MenuItem>)}
                            <Divider />
                            <MenuItem onClick={logOut} className={classes.logout} component={Link} to="/" variant="contained" >
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>Logout</MenuItem>
                        </div>
                    ) : (
                        <div>
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/about" variant="contained" >
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>About</MenuItem>
                            <Divider />
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/contact" variant="contained" >
                                <ListItemIcon>
                                    <ContactSupportIcon />
                                </ListItemIcon>Contact</MenuItem>
                            <Divider />
                            <MenuItem className={classes.main} onClick={handleClose} component={Link} to="/login" variant="contained" >
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon> Login</MenuItem>
                        </div>
                    )}
                </Menu>

            </Grid>
        </Grid >
    );
}

export default Navbar;