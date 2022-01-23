import axios from "axios";

const API_URL = "http://localhost:5000/Api/contact";

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