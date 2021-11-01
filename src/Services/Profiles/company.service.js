import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/Api/company";

const registerCompany = (name) => {
    return axios.post(API_URL + "/create",
        {
            name: name
        },
        {
            headers: authHeader()
        }
    );
};

const editCompanyAPI = (id, name) => {
    return axios.put(API_URL + "/update",
        {
            id: id,
            name: name
        },
        {
            headers: authHeader()
        }
    );
};

export default {
    registerCompany,
    editCompanyAPI
};