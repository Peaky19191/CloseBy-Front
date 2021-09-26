import axios from "axios";
import authHeader from "../services/Auth/auth-header";

const API_URL = "http://localhost:5000/api/company-worker";

const getCompanyworkersList = (pageNumber, rowsPerPage, company) => {
    return axios.get(API_URL + "/list",
        {
            headers: authHeader(),
            params: {
                page: pageNumber,
                limit: rowsPerPage,
                id: company
            }
        },
    );
};

export default {
    getCompanyworkersList,
};
