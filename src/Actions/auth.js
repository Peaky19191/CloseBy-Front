import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    RESET_PASSW_SUCCESS,
    RESET_PASSW_FAIL,
    NEW_PASSW_SUCCESS,
    NEW_PASSW_FAIL,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAIL,
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

export const setNewPassword = (password, token) => (dispatch) => {
    return AuthService.setNewUsersPassword(password, token).then(
        (response) => {
            dispatch({
                type: NEW_PASSW_SUCCESS,
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
                type: NEW_PASSW_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const confirmUserEmail = (token) => (dispatch) => {
    return AuthService.confirmUserEmail(token).then(
        (response) => {
            dispatch({
                type: CONFIRM_EMAIL_SUCCESS,
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
                type: CONFIRM_EMAIL_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};