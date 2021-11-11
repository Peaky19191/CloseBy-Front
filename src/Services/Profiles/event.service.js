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
            personLimit: limit,
            type: type
        },
        {
            headers: authHeader()
        }
    );
};


const editEventAPI = (id, title, desc, startDate, type, status, limit) => {
    return axios.put(API_URL + "/update",
        {
            id: id,
            title: title,
            description: desc,
            startDate: startDate,
            type: type,
            status: status,
            personLimit: limit,
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