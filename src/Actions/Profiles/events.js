import {
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    SET_MESSAGE,
    SET_EVENT_LOC,
    CLEAR_EVENT_LOC,
    SET_EVENT_ID,
    CLEAR_EVENT_ID,
    EDIT_EVENT_SUCCESS,
    EDIT_EVENT_FAIL,
} from "../../Constants/actionTypes";

import EventService from "../../Services/Profiles/event.service";

export const regEvent = (title, companyId, loc_lat, loc_lng, startDate, status, description, limit, type) => (dispatch) => {
    return EventService.registerEvent(title, companyId, loc_lat, loc_lng, startDate, status, description, limit, type).then(
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

export const setEventLoc = (lat, lng) => (dispatch) => {
    dispatch({
        type: SET_EVENT_LOC,
        payload: { lat: lat, lng: lng },
    });
};

export const clearEventLoc = () => (dispatch) => {
    dispatch({
        type: CLEAR_EVENT_LOC,
    });
};

export const setEventId = (idToPass) => (dispatch) => {
    dispatch({
        type: SET_EVENT_ID,
        payload: idToPass,
    });
};

export const clearEventId = () => (dispatch) => {
    dispatch({
        type: CLEAR_EVENT_ID,
    });
};


export const editEvent = (id, title, desc, startDate, type, status, limit) => (dispatch) => {
    return EventService.editEventAPI(id, title, desc, startDate, type, status, limit).then(
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