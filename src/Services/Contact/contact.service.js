import axios from "axios";
import { SERVER_API } from "../../Static/API";

const API_URL = "contact";

const sendContactMessageAPI = (email, content) => {
    return axios.post(SERVER_API + API_URL,
        {
            email: email,
            content: content
        }
    );
};

// eslint-disable-next-line
export default {
    sendContactMessageAPI
};