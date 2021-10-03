import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/api/company-admin";

const registerCompanyAdmin = (firstName, lastName, gender, email) => {
    return axios.post(API_URL + "/create",
        { headers: authHeader() },
        {
            firstName,
            lastName,
            gender,
            email,
        });
};

export default {
    registerCompanyAdmin,
};