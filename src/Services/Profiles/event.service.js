import axios from "axios";
import authHeader from "../Auth/auth-header";
import SERVER_API from "../../Static/serverApi";

const API_URL = "event/";

const registerEvent = (title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type) => {
    console.log(startDate);

    return axios.post(SERVER_API + API_URL + "create",
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

const editEventAPI = (eventId, title, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type) => {
    return axios.put(SERVER_API + API_URL + "update",
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

const getEventsList = (pageNumber, rowsPerPage, companyId) => {
    return axios.post(SERVER_API + API_URL + "list",
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
    return axios.delete(SERVER_API + API_URL + "delete",
        {
            headers: authHeader(),
            data: {
                id: id
            }
        },
    );
};

const getEventId = (id) => {
    return axios.get(SERVER_API + API_URL + id,
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