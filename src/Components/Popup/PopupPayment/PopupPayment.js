import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaymentService from "../../../Services/Payment/payment.service";
import CheckoutForm from "../../Payment/CheckoutForm/CheckoutForm";
import useStyles from './styles';

const stripePromise = loadStripe("pk_test_51JtBlaB8w02vjjwKiFtJFi9hChZg99wH3mePaaAC0OA1zaXkGRzLs0ixYnrRWVurceeXw8MsI6tvR6MpTGoDvcL300azJDH38s");

export const Payment = (props) => {
    const classes = useStyles();
    const { profile: currentProfile } = useSelector((state) => state.auth);

    const eventId = props.handleData[0];
    const uId = currentProfile.id;
    const quantity = props.handleData[1];
    const handleClose = props.handleClose;

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
        <div >
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm handleClosePopup={handleClose} />
                </Elements>
            )}
        </div>
    )
}

export default Payment;