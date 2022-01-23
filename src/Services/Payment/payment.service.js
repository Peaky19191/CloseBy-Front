import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/api/ticket";

const createPayment = (eventId, userId, quantity) => {
    return axios.post(API_URL + "/create-payment",
        {
            eventId: eventId,
            userId: userId,
            quantity: quantity
        },
        {
            headers: authHeader()
        }
    );
};

// eslint-disable-next-line
export default {
    createPayment,
};