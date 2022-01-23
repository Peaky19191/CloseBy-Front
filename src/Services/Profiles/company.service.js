import axios from "axios";
import SERVER_API from "../../Static/serverApi";
import authHeader from "../Auth/auth-header";

const API_URL = "company/";

const registerCompanyAPI = (name) => {
    return axios.post(SERVER_API + API_URL + "create",
        {
            name: name
        },
        {
            headers: authHeader()
        }
    );
};

const editCompanyAPI = (id, name) => {
    return axios.put(SERVER_API + API_URL + "update",
        {
            id: id,
            name: name
        },
        {
            headers: authHeader()
        }
    );
};

const getCompanyListAPI = (pageNumber, rowsPerPage) => {
    return axios.post(SERVER_API + API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage
        },
        {
            headers: authHeader()
        },
    );
};

const deleteCompanyAPI = (id) => {
    return axios.delete(SERVER_API + API_URL + "delete",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },
    );
};

const getCompanyIdAPI = (id) => {
    return axios.get(SERVER_API + API_URL + id,
        {
            headers: authHeader(),
        },
    );
};

// eslint-disable-next-line
export default {
    registerCompanyAPI,
    editCompanyAPI,
    getCompanyListAPI,
    deleteCompanyAPI,
    getCompanyIdAPI,
};