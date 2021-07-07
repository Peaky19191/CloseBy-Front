import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/company-admin";

const registerCustomerAdmin = (firstName, lastName, gender, email) => {
    return axios.post(API_URL + "/register",
        { headers: authHeader() },
        {
            firstName,
            lastName,
            gender,
            email,
        });
};

const getUsersList = (pageInt, rowsPerPage) => {
    return axios.get(API_URL + "/list",
        {
            headers: authHeader(),
            params: {
                page: pageInt,
                limit: rowsPerPage
            }
        },
    );
};

export default {
    registerCustomerAdmin,
    getUsersList,
};