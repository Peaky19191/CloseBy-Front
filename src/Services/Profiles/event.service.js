import axios from "axios";
import authHeader from "../Auth/auth-header";
import SERVER_API from "../../Static/serverApi";

const API_URL = "event";
const API_URL_FAV = "liked-event/";

const registerEventAPI = (title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type) => {
    return axios.post(SERVER_API + API_URL + "/create",
        {
            title: title,
            companyId: companyId,
            localization: {
                latitude: loc_lat,
                longitude: loc_lng
            },
            startDateTime: startDate,
            endDateTime: endDate,
            status: status,
            description: description,
            ticketLimit: limit,
            type: type,
            ticketPrice: "0,01",
        },
        {
            headers: authHeader()
        }
    );
};

const editEventAPI = (eventId, title, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type) => {
    return axios.put(SERVER_API + API_URL + "/update",
        {
            id: eventId,
            title: title,
            description: desc,
            startDateTime: startDate,
            endDateTime: endDate,
            type: type,
            status: status,
            ticketLimit: limit,
            companyId: companyId,
            localization: {
                latitude: loc_lat,
                longitude: loc_lng
            },
        },
        {
            headers: authHeader()
        }
    );
};

const registerEventIdAPI = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(SERVER_API + API_URL + "/list-by-company",
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

const getEventListAllApi = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(SERVER_API + API_URL + "/list",
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

const getEventListFavoriteApi = (pageNumber, rowsPerPage, userId) => {
    return axios.post(SERVER_API + API_URL_FAV + "list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            userId: userId
        },
        {
            headers: authHeader()
        },
    );
};

const deleteEventApi = (id) => {
    return axios.delete(SERVER_API + API_URL + "/delete",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },
    );
};

const getEventIdApi = (id, userId) => {
    return axios.post(SERVER_API + API_URL,
        {
            id: id,
            userId: userId
        },
        {
            headers: authHeader(),
        },
    );
};

const addToFavoriteApi = (userId, eventId) => {
    return axios.post(SERVER_API + API_URL_FAV + "create",
        {
            eventId: eventId,
            userId: userId
        },
        {
            headers: authHeader(),
        },
    );
};

const deleteFromFavoriteApi = (userId, eventId) => {
    return axios.delete(SERVER_API + API_URL_FAV + "delete",

        {
            headers: authHeader(),
            data: {
                eventId: eventId,
                userId: userId
            }
        },
    );
};

export default {
    registerEventAPI,
    editEventAPI,
    registerEventIdAPI,
    getEventListAllApi,
    getEventListFavoriteApi,
    deleteEventApi,
    getEventIdApi,
    addToFavoriteApi,
    deleteFromFavoriteApi
};