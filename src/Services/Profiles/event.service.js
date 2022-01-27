import { SERVER_API } from "../../Static/API";
import apiInstance from "../Auth/apiInstance";

const API_URL = "event";
const API_URL_FAV = "liked-event/";
const API_URL_TIC = "ticket/"

const registerEventAPI = (title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type, ticketPrice) => {
    return apiInstance.post(SERVER_API + API_URL + "/create",
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
            ticketPrice: ticketPrice,
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const editEventAPI = (eventId, title, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type, ticketPrice) => {
    return apiInstance.put(SERVER_API + API_URL + "/update",
        {
            id: eventId,
            title: title,
            description: desc,
            startDateTime: startDate,
            endDateTime: endDate,
            type: type,
            status: status,
            ticketLimit: limit,
            ticketPrice: ticketPrice,
            companyId: companyId,
            localization: {
                latitude: loc_lat,
                longitude: loc_lng
            },
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const registerEventIdAPI = (pageNumber, rowsPerPage, companyId) => {
    return apiInstance.post(SERVER_API + API_URL + "/list-by-company",
        {
            page: pageNumber,
            limit: rowsPerPage,
            companyId: companyId
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const getEventListAllApi = (pageNumber, rowsPerPage, companyId) => {
    return apiInstance.post(SERVER_API + API_URL + "/list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            companyId: companyId
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const getEventListFavoriteApi = (pageNumber, rowsPerPage, userId) => {
    return apiInstance.post(SERVER_API + API_URL_FAV + "list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            userId: userId
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const getEventListTicketApi = (userId, pageNumber, rowsPerPage) => {
    return apiInstance.post(SERVER_API + API_URL_TIC + "list-by-user",
        {
            userId: userId,
            page: pageNumber,
            limit: rowsPerPage,
        },
        // {
        //     headers: authHeader()
        // }
    );
};

const deleteEventApi = (id) => {
    return apiInstance.delete(SERVER_API + API_URL + "/delete",
        {
            // headers: authHeader(),
            data: {
                id: id
            }
        },
    );
};

const getEventIdApi = (id, userId) => {
    return apiInstance.post(SERVER_API + API_URL,
        {
            id: id,
            userId: userId
        },
        {
            // headers: authHeader(),
        },
    );
};

const addToFavoriteApi = (userId, eventId) => {
    return apiInstance.post(SERVER_API + API_URL_FAV + "create",
        {
            eventId: eventId,
            userId: userId
        },
        {
            // headers: authHeader(),
        },
    );
};

const deleteFromFavoriteApi = (userId, eventId) => {
    return apiInstance.delete(SERVER_API + API_URL_FAV + "delete",

        {
            // headers: authHeader(),
            data: {
                eventId: eventId,
                userId: userId
            }
        },
    );
};

const getEventTicketsListApi = (pageNumber, rowsPerPage, eventId) => {
    return apiInstance.post(SERVER_API + API_URL_TIC + "list-by-worker",
        {
            page: pageNumber,
            limit: rowsPerPage,
            eventId: eventId,
        },
        // {
        //     headers: authHeader()
        // }
    );
};

// eslint-disable-next-line
export default {
    registerEventAPI,
    editEventAPI,
    registerEventIdAPI,
    getEventListAllApi,
    getEventListFavoriteApi,
    deleteEventApi,
    getEventIdApi,
    addToFavoriteApi,
    deleteFromFavoriteApi,
    getEventListTicketApi,
    getEventTicketsListApi,
};