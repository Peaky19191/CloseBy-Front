import axios from "axios";
import authHeader from "../Services/Auth/auth-header";

const API_URL = "http://localhost:5000/Api/event/";

const getEventsList = (pageNumber, rowsPerPage) => {
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

const deleteEvent = (id) => {
    return axios.delete(API_URL + "delete",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },
    );
};

const getEventId = (id) => {
    return axios.get(API_URL + id,
        {
            headers: authHeader(),
        },
    );
};

export default {
    getEventsList,
    deleteEvent,
    getEventId,
};
