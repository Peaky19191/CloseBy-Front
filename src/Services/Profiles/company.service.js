import { SERVER_API } from "../../Static/API";
import apiInstance from "../Auth/apiInstance";

const API_URL = "company/";

const registerCompanyAPI = (name) => {
    return apiInstance.post(SERVER_API + API_URL + "create",
        {
            name: name
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const editCompanyAPI = (id, name) => {
    return apiInstance.put(SERVER_API + API_URL + "update",
        {
            id: id,
            name: name
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const getCompanyListAPI = (pageNumber, rowsPerPage) => {
    return apiInstance.post(SERVER_API + API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage
        },
        // {
        //     headers: authHeader()
        // },
    );
};

const deleteCompanyAPI = (id) => {
    return apiInstance.delete(SERVER_API + API_URL + "delete",
        {
            // // headers: authHeader(),
            data: {
                id: id
            }
        },
    );
};

const getCompanyIdAPI = (id) => {
    return apiInstance.get(SERVER_API + API_URL + id,
        {
            // // headers: authHeader(),
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