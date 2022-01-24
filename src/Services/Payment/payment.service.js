import axios from "axios";
import { SERVER_API } from "../../Static/API";
import authHeader from "../Auth/auth-header";

const API_URL = "ticket";

const createPayment = (eventId, userId, quantity) => {
    return axios.post(SERVER_API + API_URL + "/create-payment",
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