import axios from "axios";

const API_URL = "http://localhost:5000/Api/contact";

const sendMessage = (email, content) => {
    return axios.post(API_URL,
        {
            email: email,
            content: content
        }
    );
};

export default {
    sendMessage
};