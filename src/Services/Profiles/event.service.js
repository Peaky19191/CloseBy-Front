import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/Api/event/";

const registerEvent = (title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type) => {
    console.log(startDate);

    return axios.post(API_URL + "create",
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
            type: type
        },
        {
            headers: authHeader()
        }
    );
};

const editEventAPI = (eventId, title, companyId, loc_lat, loc_lng, startDate, status, desc, limit, type) => {
    return axios.put(API_URL + "update",
        {
            id: eventId,
            title: title,
            description: desc,
            startDateTime: startDate,
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

const getEventsList = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(API_URL + "list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            id: companyId
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
    registerEvent,
    editEventAPI,
    getEventsList,
    deleteEvent,
    getEventId,
};