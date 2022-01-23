import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaymentService from "../../../Services/Payment/payment.service";
import CheckoutForm from "../../Payment/CheckoutForm/CheckoutForm";

const pvKey = process.env.REACT_APP_API_KEY_3;
const stripePromise = loadStripe(pvKey);

export const Payment = (props) => {
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
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

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