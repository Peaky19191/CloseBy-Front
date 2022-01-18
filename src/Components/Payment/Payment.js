import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../Payment/CheckoutForm/CheckoutForm";
import PaymentService from "../../Services/Payment/payment.service"
import { useParams } from 'react-router';
import User from '../../Services/Profiles/user.service'

const stripePromise = loadStripe("pk_test_51JtBlaB8w02vjjwKiFtJFi9hChZg99wH3mePaaAC0OA1zaXkGRzLs0ixYnrRWVurceeXw8MsI6tvR6MpTGoDvcL300azJDH38s");

export const Payment = (props) => {

    const { profile: currentProfile } = useSelector((state) => state.auth);
    
    const { eventId } = props.handleData[1];
    const uId = currentProfile.id;
    const { quantity } = props.handleData[0];

    console.log(uId);

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