import {
    CONTACT_SUCCESS,
    CONTACT_FAIL,
    SET_MESSAGE,
} from "../Constants/actionTypes";

import ContactService from "../Services/Contact/contact.service";

export const sendMessage = (email, content) => (dispatch) => {
    return ContactService.sendMessage(email, content).then(
        (response) => {
            dispatch({
                type: CONTACT_SUCCESS,
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
                type: CONTACT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};