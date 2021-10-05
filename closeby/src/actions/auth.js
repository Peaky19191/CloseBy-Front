import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    RESET_PASSW_SUCCESS,
    RESET_PASSW_FAIL
} from "../constants/actionTypes";

import AuthService from "../services/Auth/auth.service";

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

export const resetPassword = (email) => (dispatch) => {
    return AuthService.resetUsersPassword(email).then(
        (response) => {
            dispatch({
                type: RESET_PASSW_SUCCESS,
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
                type: RESET_PASSW_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};