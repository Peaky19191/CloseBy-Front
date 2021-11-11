import React, { useState, useEffect } from "react";
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const PopupDelete = (props) => {
    const classes = useStyles();
    console.log(props.handleData);


    return (
        <div className={classes.popupBox} >
            <Container className={classes.container} component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <DeleteForeverIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Do you want to delete: {props.handleData[0]}?
                    </Typography>
                    <Grid container className={classes.containerData} spacing={3}>
                        {(props.handleData[0] === "Company") ?
                            <Grid item xs={12} >
                                <TextField value={props.handleData[1]} label="Company" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                            </Grid>
                            :
                            <Grid item xs={12} >
                                <TextField value={props.handleData[1]} label="First Name" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                            </Grid>
                        }
                        {props.handleData[2] &&
                            <Grid item xs={12} >
                                <TextField value={props.handleData[2]} label="Last Name" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                            </Grid>}
                        {props.handleData[3] &&
                            <Grid item xs={12} >
                                <TextField value={props.handleData[3]} label="Email Address" InputProps={{ readOnly: true }} variant="outlined" type="email" fullWidth />
                            </Grid>}
                        {props.handleData[4] &&
                            <Grid item xs={12} >
                                <TextField label="Company" value={props.handleData[4]} InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                            </Grid>}
                    </Grid>
                    <Grid className={classes.containerButton} spacing={2}>
                        <Button onClick={props.handleClose} className={classes.button} variant="contained" color="primary">
                            close
                        </Button>
                        <Button onClick={props.handleDelete} className={classes.button} variant="contained" color="secondary">
                            delete
                        </Button>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};

export default PopupDelete;