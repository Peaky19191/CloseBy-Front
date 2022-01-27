import { SERVER_API } from "../../Static/API";
import apiInstance from "../Auth/apiInstance";

const API_URL = "ticket";

const createPayment = (eventId, userId, quantity) => {
    return apiInstance.post(SERVER_API + API_URL + "/create-payment",
        {
            eventId: eventId,
            userId: userId,
            quantity: quantity
        },
        // {
        //     headers: authHeader()
        // }
    );
};

// eslint-disable-next-line
export default {
    createPayment,
};