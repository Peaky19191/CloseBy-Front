import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { AppBar, Avatar, Button, Grid, Toolbar, Typography, Menu, MenuItem, IconButton, Divider } from '@material-ui/core';

const Main = () => {

    const classes = useStyles();
    const [showGlobalAdminContent, setShowGlobalAdminContent] = useState(false);
    const [showCompanyAdminContent, setShowCompanyAdminContent] = useState(false);
    const [showCompanyWorkerContent, setShowCompanyWorkerContent] = useState(false);
    const [showUserContent, setShowUserContent] = useState(false);

    const { profile: currentProfile } = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentProfile && currentProfile.role) {
            setShowUserContent(currentProfile.role.includes("User"));
            setShowCompanyWorkerContent(currentProfile.role.includes("CompanyWorker"));
            setShowCompanyAdminContent(currentProfile.role.includes("CompanyAdmin"));
            setShowGlobalAdminContent(currentProfile.role.includes("GlobalAdmin"));
        }
    }, [currentProfile]);

    return (
        <Grid  >
            <Grid >
                {currentProfile && (
                    <>
                        Content for All
                    </>
                )}
                {currentProfile && showUserContent && (
                    <>
                        Content for User
                    </>
                )}
                {currentProfile && showCompanyWorkerContent && (
                    <>
                        Content for CompanyWorker
                    </>
                )}
                {currentProfile && showCompanyAdminContent && (
                    <>
                        Content for CompanyAdmin
                    </>
                )}
                {currentProfile && showGlobalAdminContent && (
                    <>
                        Content for GlobalAdmin
                    </>
                )}
            </Grid>
        </Grid >
    );
};

export default Main;
