import axios from "axios";
import authHeader from "../Auth/auth-header";

const API_URL = "http://localhost:5000/Api/event";

const registerEvent = (title, companyId, loc_lat, loc_lng, startDate, status, description, limit, type) => {
    console.log("API startDate");

    console.log(startDate);

    return axios.post(API_URL + "/create",
        {
            title: title,
            companyId: companyId,
            localization: {
                latitude: loc_lat,
                longitude: loc_lng
            },
            startDateTime: startDate,
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
    return axios.put(API_URL + "/update",
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

export default {
    registerEvent,
    editEventAPI,
};