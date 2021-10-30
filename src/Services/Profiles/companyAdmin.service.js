import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/Api/company-admin";

const registerCompanyAdmin = (firstName, lastName, gender, email, companyId) => {
    return axios.post(API_URL + "/create",
        {
            firstName,
            lastName,
            email,
            gender,
            companyId
        },
        {
            headers: authHeader()
        }
    );
};

export default {
    registerCompanyAdmin,
};