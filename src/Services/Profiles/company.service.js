import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/api/company";

const registerCompany = (name) => {
    return axios.post(API_URL + "/create",
        {
            name
        },
        {
            headers: authHeader()
        }
    );
};

export default {
    registerCompany,
};