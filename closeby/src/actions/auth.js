import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "../Constants/actionTypes";

import AuthService from "../Services/Auth/auth.service";

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { profile: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.type;
            // (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            // error.message ||
            // error.toString();
            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};