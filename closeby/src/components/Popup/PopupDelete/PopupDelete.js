import React from "react";
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const PopupDelete = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.popupBox} >
            <Container className={classes.container} component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <DeleteForeverIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Are you sure you want to delete this {props.handleData[0]}?
                    </Typography>
                    <Typography component="h1" variant="h6">
                        {props.handleData[1]}   {props.handleData[2]}
                    </Typography>
                    <Typography component="h1" variant="h6">
                        {props.handleData[3]}
                    </Typography>
                    <Grid className={classes.containerButton} container spacing={2}>
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