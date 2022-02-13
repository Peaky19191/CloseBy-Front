import { Avatar, Button, Container, Grid, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import moment from 'moment';
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const TicketDetails = () => {
    const classes = useStyles();

    const { ticket: currentTicket } = useSelector((state) => state.ticket);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Ticket Details</Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField value={currentTicket.ticketPayment.user.firstName} label="First Name" InputProps={{ readOnly: true }} name="ticketId" htmlFor="ticketId" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={currentTicket.ticketPayment.user.lastName} label="Last Name" InputProps={{ readOnly: true }} name="ticketId" htmlFor="ticketId" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={currentTicket.ticketPayment.event.title} label="Event" InputProps={{ readOnly: true }} name="ticketId" htmlFor="ticketId" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={moment(currentTicket.ticketPayment.event.startDateTime).format('DD/MM/YYYY - hh:mm ')} label="Date" InputProps={{ readOnly: true }} name="ticketId" htmlFor="ticketId" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={currentTicket.ticketPayment.quantity} label="Quantity" InputProps={{ readOnly: true }} name="ticketId" htmlFor="ticketId" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={currentTicket.ticketPayment.quantity * currentTicket.ticketPayment.amount} label="Price" InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">€</InputAdornment>, }} name="ticketId" htmlFor="ticketId" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={currentTicket.id} label="Ticket ID" InputProps={{ readOnly: true }} name="ticketId" htmlFor="ticketId" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} >
                        <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                            back
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default TicketDetails;


