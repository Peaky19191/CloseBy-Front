import axios from "axios";
import authHeader from "../Services/Auth/auth-header";

const API_URL = "http://localhost:5000/api/company-admin";

const update = (pageInt, rowsPerPage) => {
    return axios.get(API_URL + "/list",
        {
            headers: authHeader(),
            params: {
                page: pageInt,
                limit: rowsPerPage

            }
        },
    );
};

export default {
    update,
};
