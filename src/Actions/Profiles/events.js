import {
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    SET_MESSAGE,
    SET_NEW_EVENT_LOC,
    SET_CURRENT_EVENT_LOC,
    CLEAR_NEW_EVENT_LOC,
    CLEAR_CURRENT_EVENT_LOC,
    SET_EVENT,
    CLEAR_EVENT,
    EDIT_EVENT_SUCCESS,
    EDIT_EVENT_FAIL,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_LIST_FAIL,
    GET_EVENT_LIST_ALL_SUCCESS,
    GET_EVENT_LIST_ALL_FAIL,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    GET_EVENT_ID_SUCCESS,
    GET_EVENT_ID_FAIL,
    GET_EVENT_LIST_FOR_USER_SUCCESS,
    GET_EVENT_LIST_FOR_USER_FAIL,
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_FAIL,
    GET_EVENT_LIST_FAV_SUCCESS,
    GET_EVENT_LIST_FAV_FAIL,
    SET_FAVORITE_SUCCESS,
    SET_FAVORITE_FAIL,
    DELETE_FAVORITE_SUCCESS,
    DELETE_FAVORITE_FAIL,
} from "../../Constants/actionTypes";
import {
    ADMIN_500,
    ERROR_400,
    EVENT_REG_SUCCESS_200,
    EVENT_EDIT_SUCCESS_200,
} from "../../Static/message";
import EventService from "../../Services/Profiles/event.service";
import { toast } from 'react-toastify';

export const registerEventDispatch = (title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type) => (dispatch) => {
    return EventService.registerEventAPI(title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type).then(
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
            const message = ADMIN_500;

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

export const clearEventDispatch = () => (dispatch) => {
    dispatch({
        type: CLEAR_EVENT,
    });
};


export const editEvent = (eventId, title, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type) => (dispatch) => {
    return EventService.editEventAPI(eventId, title, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type).then(
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
            const message = ADMIN_500;

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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