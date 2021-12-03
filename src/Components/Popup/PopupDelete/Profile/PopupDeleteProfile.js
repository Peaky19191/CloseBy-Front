import React, { useState, useEffect } from "react";
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@material-ui/core/IconButton';

const PopupDeleteProfile = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.popupBox} >
            <Container className={classes.container} component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Grid className={classes.headerContainer} >
                        <Grid className={classes.closeIconContainer}>
                            <IconButton onClick={props.handleClose} aria-label="close" size="small">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        <Avatar className={classes.avatar}>
                            <DeleteForeverIcon />
                        </Avatar>
                    </Grid>
                    <Typography component="h1" variant="h5">
                        Delete this {props.handleData[0]}?
                    </Typography>
                    <Grid container className={classes.containerData} spacing={2}>
                        <Grid item xs={12} >
                            <TextField value={props.handleData[1]} label="First Name" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={props.handleData[2]} label="Last Name" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={props.handleData[3]} label="Email Address" InputProps={{ readOnly: true }} variant="outlined" type="email" fullWidth />
                        </Grid>
                        {props.handleData[4] && <Grid item xs={12} >
                            <TextField label="Company" value={props.handleData[4]} InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                        </Grid>}
                        <Grid item xs={12}>
                            <Button onClick={props.handleDelete} variant="contained" color="secondary" fullWidth>
                                delete
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};

export default PopupDeleteProfile;