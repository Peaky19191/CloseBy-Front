import axios from "axios";
import authHeader from "../services/Auth/auth-header";

const API_URL = "http://localhost:5000/api/company-admin";

const getCompanyAdminsList = (pageNumber, rowsPerPage) => {
    return axios.post(API_URL + "/list",
        {
            page: pageNumber,
            limit: rowsPerPage
        },
        {
            headers: authHeader()
        },
    );
};

const deleteCompanyAdmin = (id) => {
    return axios.delete(API_URL + "/delete/" + id);
};

export default {
    getCompanyAdminsList,
    deleteCompanyAdmin
};
