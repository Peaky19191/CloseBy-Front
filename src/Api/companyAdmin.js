import axios from "axios";
import authHeader from "../Services/Auth/auth-header";

const API_URL = "http://localhost:5000/Api/company-admin";

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

const deleteCompanyAdmin = (id, companyId) => {
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

const getCompanyAdminId = (id) => {
    return axios.get(API_URL + "/" + id,
        {
            headers: authHeader(),
        },

    );
};

export default {
    getCompanyAdminsList,
    deleteCompanyAdmin,
    getCompanyAdminId
};
