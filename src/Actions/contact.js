import { toast } from 'react-toastify';
import {
    CONTACT_FAIL, CONTACT_SUCCESS, SET_MESSAGE_FAIL, SET_MESSAGE_SUCCESS
} from "../Constants/actionTypes";
import ContactService from "../Services/Contact/contact.service";
import {
    ADMIN_500,
    SEND_CONTACT_MESSAGE_SUCCESS_200
} from "../Static/message";

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
            toast.success("Your message has been successfully sent.")
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
            toast.warn(message)

            return Promise.reject();
        }
    );
};