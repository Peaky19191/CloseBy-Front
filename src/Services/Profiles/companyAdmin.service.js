import axios from "axios";
import authHeader from "../Auth/auth-header";
import SERVER_API from "../../Static/serverApi";

const API_URL = "company-admin/";

const registerCompanyAdmin = (firstName, lastName, gender, email, companyId) => {
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

const editCompanyAdminAPI = (id, firstName, lastName, gender, email, companyId) => {
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

const getCompanyAdminsList = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(SERVER_API + API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            companyId: companyId
        },
        {
            headers: authHeader()
        },
    );
};

const deleteCompanyAdmin = (id, companyId) => {
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

const getCompanyAdminId = (id) => {
    return axios.get(SERVER_API + API_URL + id,
        {
            headers: authHeader(),
        },

    );
};

export default {
    registerCompanyAdmin,
    editCompanyAdminAPI,
    getCompanyAdminsList,
    deleteCompanyAdmin,
    getCompanyAdminId,
};