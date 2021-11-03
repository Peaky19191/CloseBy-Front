import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { AppBar, Avatar, Button, Grid, Toolbar, Typography, Menu, MenuItem, IconButton, Divider } from '@material-ui/core';

const Main = () => {

    const classes = useStyles();
    const [showGlobalAdminBoard, setShowGlobalAdminBoard] = useState(false);
    const [showCompanyAdminBoard, setShowCompanyAdminBoard] = useState(false);
    const [showCompanyWorkerBoard, setShowCompanyWorkerBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);

    const { profile: currentProfile } = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentProfile && currentProfile.role) {
            setShowUserBoard(currentProfile.role.includes("User"));
            setShowCompanyWorkerBoard(currentProfile.role.includes("CompanyWorker"));
            setShowCompanyAdminBoard(currentProfile.role.includes("CompanyAdmin"));
            setShowGlobalAdminBoard(currentProfile.role.includes("GlobalAdmin"));
        }
    }, [currentProfile]);

    return (
        <Grid  >
            <Grid >
                {currentProfile && showUserBoard && (
                    <>
                        Content for User
                    </>
                )}
                {currentProfile && showCompanyWorkerBoard && (
                    <>
                        Content for CompanyWorker
                    </>
                )}
                {currentProfile && showCompanyAdminBoard && (
                    <>
                        Content for CompanyAdmin
                    </>
                )}
                {currentProfile && showGlobalAdminBoard && (
                    <>
                        Content for GlobalAdmin
                    </>
                )}
                {currentProfile && (
                    <>
                        Content for All
                    </>
                )}
            </Grid>
        </Grid >
    );
};

export default Main;
