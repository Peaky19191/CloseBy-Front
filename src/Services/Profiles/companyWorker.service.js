import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/Api/company-worker/";

const registerCompanyWorker = (firstName, lastName, gender, email, companyId) => {
    return axios.post(API_URL + "create",
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
    return axios.put(API_URL + "update",
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

const getCompanyWorkersList = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            id: companyId
        },
        {
            headers: authHeader()
        }
    );
};

const deleteCompanyWorker = (id, companyId) => {
    return axios.delete(API_URL + "delete",
        {
            headers: authHeader(),
            data: {
                id: id,
                companyId: companyId
            }
        },

    );
};


const getCompanyWorkerId = (id) => {
    return axios.get(API_URL + id,
        {
            headers: authHeader(),
        },

    );
};

export default {
    registerCompanyWorker,
    editCompanyWorkerAPI,
    getCompanyWorkersList,
    deleteCompanyWorker,
    getCompanyWorkerId,
};