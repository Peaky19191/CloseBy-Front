import { toast } from 'react-toastify';
import {
    CLEAR_CURRENT_EVENT_LOC, CLEAR_EVENT, CLEAR_NEW_EVENT_LOC, CLEAR_TICKET, DELETE_EVENT_FAIL, DELETE_EVENT_SUCCESS, DELETE_FAVORITE_FAIL, DELETE_FAVORITE_SUCCESS, EDIT_EVENT_FAIL, EDIT_EVENT_SUCCESS, GET_EVENT_ID_FAIL, GET_EVENT_ID_SUCCESS, GET_EVENT_LIST_ALL_FAIL, GET_EVENT_LIST_ALL_SUCCESS, GET_EVENT_LIST_FAIL, GET_EVENT_LIST_FAV_FAIL, GET_EVENT_LIST_FAV_SUCCESS, GET_EVENT_LIST_SUCCESS, GET_EVENT_LIST_TIC_FAIL, GET_EVENT_LIST_TIC_SUCCESS, REGISTER_EVENT_FAIL, REGISTER_EVENT_SUCCESS, SET_CURRENT_EVENT_LOC, SET_EVENT, SET_FAVORITE_FAIL, SET_FAVORITE_SUCCESS, SET_MESSAGE, SET_MESSAGE_FAIL, SET_MESSAGE_SUCCESS, SET_NEW_EVENT_LOC, SET_TICKET
} from "../../Constants/actionTypes";
import EventService from "../../Services/Profiles/event.service";
import {
    ADMIN_500, ERROR_401, EVENT_EDIT_SUCCESS_200, EVENT_REG_SUCCESS_200
} from "../../Static/message";

export const registerEventDispatch = (title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type, ticketPrice) => (dispatch) => {
    return EventService.registerEventAPI(title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type, ticketPrice).then(
        (response) => {
            dispatch({
                type: REGISTER_EVENT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: EVENT_REG_SUCCESS_200,
            });

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: REGISTER_EVENT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const setNewEventLoc = (lat, lng) => (dispatch) => {
    dispatch({
        type: SET_NEW_EVENT_LOC,
        payload: { lat: lat, lng: lng },
    });
};

export const setCurrentEventLoc = (lat, lng) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_EVENT_LOC,
        payload: { lat: lat, lng: lng },
    });
};

export const clearNewEventLoc = () => (dispatch) => {
    dispatch({
        type: CLEAR_NEW_EVENT_LOC,
    });
};
export const clearCurrentEventLoc = () => (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT_EVENT_LOC,
    });
};

export const setEventDispatch = (event) => (dispatch) => {
    localStorage.setItem("Event", JSON.stringify(event));

    dispatch({
        type: SET_EVENT,
        payload: event,
    });
};

export const setTicketDispatch = (ticket) => (dispatch) => {
    localStorage.setItem("Ticket", JSON.stringify(ticket));

    dispatch({
        type: SET_TICKET,
        payload: ticket,
    });
};

export const clearEventDispatch = () => (dispatch) => {
    dispatch({
        type: CLEAR_EVENT,
    });
};

export const clearTicketDispatch = () => (dispatch) => {
    dispatch({
        type: CLEAR_TICKET,
    });
};

export const editEvent = (eventId, title, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type, ticketPrice) => (dispatch) => {
    return EventService.editEventAPI(eventId, title, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type, ticketPrice).then(
        (response) => {
            dispatch({
                type: EDIT_EVENT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: EVENT_EDIT_SUCCESS_200,
            });

            toast.success("Your changes have been saved.")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: EDIT_EVENT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            toast.error(message);

            return Promise.reject();
        }
    );
};

export const getEventListDispatch = (pageNumber, rowsPerPage, companyId) => (dispatch) => {
    return EventService.registerEventIdAPI(pageNumber, rowsPerPage, companyId).then(
        (response) => {
            dispatch({
                type: GET_EVENT_LIST_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: GET_EVENT_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getEventListAllDispatch = (pageNumber, rowsPerPage, companyId) => (dispatch) => {
    return EventService.getEventListAllApi(pageNumber, rowsPerPage, companyId).then(
        (response) => {
            dispatch({
                type: GET_EVENT_LIST_ALL_SUCCESS,
                payload: response.data.items,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: GET_EVENT_LIST_ALL_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getEventListFavoriteDispatch = (pageNumber, rowsPerPage, userId) => (dispatch) => {
    return EventService.getEventListFavoriteApi(pageNumber, rowsPerPage, userId).then(
        (response) => {
            dispatch({
                type: GET_EVENT_LIST_FAV_SUCCESS,
                payload: response.data.items,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: GET_EVENT_LIST_FAV_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteEventDispatch = (id) => (dispatch) => {
    return EventService.deleteEventApi(id).then(
        (response) => {
            dispatch({
                type: DELETE_EVENT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            toast.success("Event has been successfuly deleted.")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: DELETE_EVENT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            toast.error(message);

            return Promise.reject();
        }
    );
};

export const getEventIdDispatch = (id, userId) => (dispatch) => {
    return EventService.getEventIdApi(id, userId).then(
        (response) => {
            dispatch({
                type: GET_EVENT_ID_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: GET_EVENT_ID_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteFromFavoriteDispatch = (userId, eventId) => (dispatch) => {
    return EventService.deleteFromFavoriteApi(userId, eventId).then(
        (response) => {
            dispatch({
                type: DELETE_FAVORITE_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            toast.success("Event has been successfully removed from favorites.")

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: DELETE_FAVORITE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            toast.error(message);

            return Promise.reject();
        }
    );
};

export const addToFavoriteDispatch = (userId, eventId) => (dispatch) => {
    return EventService.addToFavoriteApi(userId, eventId).then(
        (response) => {
            dispatch({
                type: SET_FAVORITE_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            toast.success("Event has been successfully added to your favorites.")

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: SET_FAVORITE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            toast.error(message);

            return Promise.reject();
        }
    );
};

export const getEventListTicketDispatch = (userId, pageNumber, rowsPerPage) => (dispatch) => {
    return EventService.getEventListTicketApi(userId, pageNumber, rowsPerPage).then(
        (response) => {
            dispatch({
                type: GET_EVENT_LIST_TIC_SUCCESS,
                payload: response.data.items,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: GET_EVENT_LIST_TIC_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getEventTicketsListDispatch = (pageNumber, rowsPerPage, eventId) => (dispatch) => {
    return EventService.getEventTicketsListApi(pageNumber, rowsPerPage, eventId).then(
        (response) => {
            dispatch({
                type: GET_EVENT_LIST_ALL_SUCCESS,
                payload: response.data.items,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: GET_EVENT_LIST_ALL_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

