import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/Api/company-admin/";

const registerCompanyAdmin = (firstName, lastName, gender, email, companyId) => {
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

const editCompanyAdminAPI = (id, firstName, lastName, gender, email, companyId) => {
    return axios.put(API_URL + "update",
        {
            id: id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            // FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY
            // company: {
            //     id: companyId,
            //     name: "compName",
            // }
        },
        {
            headers: authHeader()
        }
    );
};

const getCompanyAdminsList = (pageNumber, rowsPerPage) => {
    return axios.post(API_URL + "list",
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

const getCompanyAdminId = (id) => {
    return axios.get(API_URL + id,
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