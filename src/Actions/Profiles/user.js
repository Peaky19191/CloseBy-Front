import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    SET_MESSAGE,
    SET_USER_ID,
    CLEAR_USER_ID
} from "../../Constants/actionTypes";

import AuthService from "../../Services/Profiles/user.service";

export const registerUser = (firstName, lastName, gender, email, password) => (dispatch) => {
    return AuthService.registerUser(firstName, lastName, gender, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_USER_SUCCESS,
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
                type: REGISTER_USER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const setUserId = (idToPass) => (dispatch) => {
    dispatch({
        type: SET_USER_ID,
        payload: idToPass,
    });
};

export const clearUserId = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER_ID,
    });
};