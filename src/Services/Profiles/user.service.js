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

const editUserAPI = (id, firstName, lastName, gender, email) => {
    return axios.put(API_URL + "/update",
        {
            id: id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
        },
        {
            headers: authHeader()
        }
    );
};

export default {
    getUserData,
    registerUser,
    editUserAPI,
};