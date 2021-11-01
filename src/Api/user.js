import axios from "axios";
import authHeader from "../Services/Auth/auth-header";

const API_URL = "http://localhost:5000/Api/user";

const getUsersList = (pageNumber, rowsPerPage) => {
    return axios.post(API_URL + "/list",
        {
            page: pageNumber,
            limit: rowsPerPage
        },
        {
            headers: authHeader(),
        }
    );
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "/delete",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },

    );
};

const getUserId = (id) => {
    return axios.get(API_URL + "/" + id,
        {
            headers: authHeader(),
        },

    );
};

const updateUser = (id) => {
    return axios.put(API_URL + "/update",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },

    );
};

export default {
    getUsersList,
    deleteUser,
    getUserId
};
