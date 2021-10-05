import axios from "axios";
import authHeader from "../services/Auth/auth-header";

const API_URL = "http://localhost:5000/api/company-worker";

const getCompanyworkersList = (pageNumber, rowsPerPage, company) => {
    return axios.post(API_URL + "/list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            id: company
        },
        {
            headers: authHeader()
        }
    );
};

const deleteCompanyWorker = (id) => {
    return axios.delete(API_URL + "/delete/" + id);
};

export default {
    getCompanyworkersList,
    deleteCompanyWorker
};

