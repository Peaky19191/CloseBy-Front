import axios from "axios";
import { SERVER_API } from "../../Static/API";

const API_URL = "company-admin/";

const registerCompanyAdminAPI = (firstName, lastName, gender, email, companyId) => {
    return axios.post(SERVER_API + API_URL + "create",
        {
            firstName,
            lastName,
            email,
            gender,
            companyId
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const editCompanyAdminAPI = (id, firstName, lastName, gender, email, companyId) => {
    return axios.put(SERVER_API + API_URL + "update",
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

const getCompAdminListAPI = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(SERVER_API + API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            companyId: companyId
        },
        // {
        //     headers: authHeader()
        // },
    );
};

const deleteCompAdminAPI = (id, companyId) => {
    return axios.delete(SERVER_API + API_URL + "delete",
        {
            // headers: authHeader(),
            data: {
                id: id,
                companyId: companyId
            }
        },

    );
};

const getCompAdminIdAPI = (id) => {
    return axios.get(SERVER_API + API_URL + id,
        {
            // headers: authHeader(),
        },

    );
};

// eslint-disable-next-line
export default {
    registerCompanyAdminAPI,
    editCompanyAdminAPI,
    getCompAdminListAPI,
    deleteCompAdminAPI,
    getCompAdminIdAPI,
};