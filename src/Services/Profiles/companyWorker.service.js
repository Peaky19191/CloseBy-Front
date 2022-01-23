import axios from "axios";
import SERVER_API from "../../Static/serverApi";
import authHeader from "../Auth/auth-header";

const API_URL = "company-worker/";

const registerCompanyWorkerAPI = (firstName, lastName, gender, email, companyId) => {
    return axios.post(SERVER_API + API_URL + "create",
        {
            firstName,
            lastName,
            email,
            gender,
            companyId
        },
        {
            headers: authHeader()
        }
    );
};

const editCompanyWorkerAPI = (id, firstName, lastName, gender, email) => {
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

const getCompWorkerListAPI = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(SERVER_API + API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            companyId: companyId
        },
        {
            headers: authHeader()
        }
    );
};

const deleteCompWorkerAPI = (id, companyId) => {
    return axios.delete(SERVER_API + API_URL + "delete",
        {
            headers: authHeader(),
            data: {
                id: id,
                companyId: companyId
            }
        },

    );
};


const getCompWorkerIdAPI = (id) => {
    return axios.get(SERVER_API + API_URL + id,
        {
            headers: authHeader(),
        },

    );
};

// eslint-disable-next-line
export default {
    registerCompanyWorkerAPI,
    editCompanyWorkerAPI,
    getCompWorkerListAPI,
    deleteCompWorkerAPI,
    getCompWorkerIdAPI,
};