import {
    CONTACT_SUCCESS,
    CONTACT_FAIL,
    SET_MESSAGE,
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_FAIL,
} from "../Constants/actionTypes";
import {
    ADMIN_500,
    SEND_CONTACT_MESSAGE_SUCCESS_200,
} from "../Static/message";
import ContactService from "../Services/Contact/contact.service";

export const sendContactMessageDispatch = (email, content) => (dispatch) => {
    return ContactService.sendContactMessageAPI(email, content).then(
        (response) => {
            dispatch({
                type: CONTACT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: SEND_CONTACT_MESSAGE_SUCCESS_200,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = ADMIN_500;

            dispatch({
                type: CONTACT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            return Promise.reject();
        }
    );
};