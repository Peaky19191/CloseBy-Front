import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/Api/user/";

const registerUser = (firstName, lastName, gender, email, password) => {
    return axios.post(API_URL + "register", {
        firstName,
        lastName,
        gender,
        email,
        password,
    });
};

const getUserData = (id) => {
    return axios.get(API_URL, { id });
};

export default {
    getUserData,
    registerUser
};