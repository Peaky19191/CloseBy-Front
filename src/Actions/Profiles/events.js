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
} from "../../Constants/actionTypes";

import EventService from "../../Services/Profiles/event.service";

export const registerEventDispatch = (title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type) => (dispatch) => {
    return EventService.registerEventAPI(title, companyId, loc_lat, loc_lng, startDate, endDate, status, description, limit, type).then(
        (response) => {
            dispatch({
                type: REGISTER_EVENT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

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
                type: REGISTER_EVENT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
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
                type: SET_MESSAGE,
                payload: response.data.message,
            });

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
                type: EDIT_EVENT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

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

            return Promise.reject();
        }
    );
};

export const getEventIdDispatch = (id) => (dispatch) => {
    return EventService.getEventIdApi(id).then(
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