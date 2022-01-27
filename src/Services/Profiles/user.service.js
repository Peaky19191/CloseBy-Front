import { SERVER_API } from "../../Static/API";
import apiInstance from "../Auth/apiInstance";

const API_URL = "user/";

const registerUserAPI = (firstName, lastName, gender, email, password) => {
    return apiInstance.post(SERVER_API + API_URL + "register", {
        firstName,
        lastName,
        gender,
        email,
        password,
    });
};

const getUserDataAPI = (id) => {
    return apiInstance.get(SERVER_API + API_URL, { id });
};

const updateUserAPI = (id, firstName, lastName, gender, email) => {
    return apiInstance.put(SERVER_API + API_URL + "update",
        {
            id: id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const getUserListAPI = (pageNumber, rowsPerPage) => {
    return apiInstance.post(SERVER_API + API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage
        },
        {
            // headers: authHeader(),
        }
    );
};

const deleteUserAPI = (id) => {
    return apiInstance.delete(SERVER_API + API_URL + "delete",
        {
            // headers: authHeader(),
            data: {
                id: id
            }
        },

    );
};

const getUserIdAPI = (id) => {
    return apiInstance.get(SERVER_API + API_URL + id,
        {
            // headers: authHeader(),
        },

    );
};

// eslint-disable-next-line
export default {
    getUserDataAPI,
    registerUserAPI,
    updateUserAPI,
    getUserListAPI,
    deleteUserAPI,
    getUserIdAPI,
};