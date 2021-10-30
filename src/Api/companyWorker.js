import axios from "axios";
import authHeader from "../Services/Auth/auth-header";

const API_URL = "http://localhost:5000/Api/company-worker";

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


const getCompanyWorkerId = (id) => {
    return axios.get(API_URL + "/" + id,
        {
            headers: authHeader(),
        },

    );
};

export default {
    getCompanyWorkersList,
    deleteCompanyWorker,
    getCompanyWorkerId
};

