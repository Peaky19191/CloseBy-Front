import axios from "axios";

const API_URL = "https://close-by-backend.herokuapp.com/Api/contact";

const sendContactMessageAPI = (email, content) => {
    return axios.post(API_URL,
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