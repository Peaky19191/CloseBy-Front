import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../../Payment/CheckoutForm/CheckoutForm";
import PaymentService from "../../../Services/Payment/payment.service"
import { useParams } from 'react-router';
import User from '../../../Services/Profiles/user.service'
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, MenuItem, InputLabel } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@material-ui/core/IconButton';

const stripePromise = loadStripe("pk_test_51JtBlaB8w02vjjwKiFtJFi9hChZg99wH3mePaaAC0OA1zaXkGRzLs0ixYnrRWVurceeXw8MsI6tvR6MpTGoDvcL300azJDH38s");

export const Payment = (props) => {
    const classes = useStyles();
    const { profile: currentProfile } = useSelector((state) => state.auth);
    
    const eventId = props.handleData[0];
    const uId = currentProfile.id;
    const quantity = props.handleData[1];

    console.log('user: '+ uId);
    console.log('eventid: ' + eventId);
    console.log('quantity: ' + props.handleData[1]);

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        PaymentService.createPayment(eventId, uId, quantity).then(
            (response) => {
                setClientSecret(response.data.paymentIntentToken);
            },
            (error) => {
                const _clientSecret =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setClientSecret(_clientSecret);
            }
        );
    }, []);

    const apperarance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        apperarance,
    };

    return (
        <div className="Payment">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Payment;