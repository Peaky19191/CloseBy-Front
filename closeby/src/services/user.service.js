import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/event";

const getUserData = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getOrganizerData = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminData = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
    getUserData,
    getOrganizerData,
    getAdminData,
};