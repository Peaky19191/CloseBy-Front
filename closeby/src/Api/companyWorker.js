import axios from "axios";
import authHeader from "../services/Auth/auth-header";

const API_URL = "http://localhost:5000/api/company-worker";

const getCompanyWorkersList = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(API_URL + "/list",
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
    return axios.delete(API_URL + "/delete",
        {
            headers: authHeader(),
            data: {
                id: id,
                companyId: companyId
            }
        },

    );
};

export default {
    getCompanyWorkersList,
    deleteCompanyWorker
};
