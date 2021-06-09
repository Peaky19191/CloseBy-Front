import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/user/test";

const getUserData = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getOrganizerData = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

export default {
    getUserData,
    getOrganizerData,
};