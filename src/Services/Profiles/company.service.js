import axios from "axios";
import authHeader from "../Auth/auth-header";
import SERVER_API from "../../Static/serverApi";

const API_URL = "company/";

const registerCompany = (name) => {
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

const getCompanyList = (pageNumber, rowsPerPage) => {
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

const deleteCompany = (id) => {
    return axios.delete(SERVER_API + API_URL + "delete",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },
    );
};

const getCompanyId = (id) => {
    return axios.get(SERVER_API + API_URL + id,
        {
            headers: authHeader(),
        },
    );
};

export default {
    registerCompany,
    editCompanyAPI,
    getCompanyList,
    deleteCompany,
    getCompanyId,
};