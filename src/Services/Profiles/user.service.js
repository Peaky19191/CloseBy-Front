import axios from "axios";
import authHeader from "../Auth/auth-header";
import SERVER_API from "../../Static/serverApi";

const API_URL = "user/";

const registerUserAPI = (firstName, lastName, gender, email, password) => {
    return axios.post(SERVER_API + API_URL + "register", {
        firstName,
        lastName,
        gender,
        email,
        password,
    });
};

const getUserDataAPI = (id) => {
    return axios.get(SERVER_API + API_URL, { id });
};

const updateUserAPI = (id, firstName, lastName, gender, email) => {
    return axios.put(SERVER_API + API_URL + "update",
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

const getUserListAPI = (pageNumber, rowsPerPage) => {
    return axios.post(SERVER_API + API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage
        },
        {
            headers: authHeader(),
        }
    );
};

const deleteUserAPI = (id) => {
    return axios.delete(SERVER_API + API_URL + "delete",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },

    );
};

const getUserIdAPI = (id) => {
    return axios.get(SERVER_API + API_URL + id,
        {
            headers: authHeader(),
        },

    );
};

export default {
    getUserDataAPI,
    registerUserAPI,
    updateUserAPI,
    getUserListAPI,
    deleteUserAPI,
    getUserIdAPI,
};