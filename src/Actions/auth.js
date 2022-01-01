import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    RESET_PASSW_SUCCESS,
    RESET_PASSW_FAIL,
    NEW_PASSW_SUCCESS,
    NEW_PASSW_FAIL,
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_FAIL,
} from "../Constants/actionTypes";
import {
    ADMIN_500,
    ERROR_400,
    NEW_PASSW_SUCCESS_200,
    RESET_PASSW_SUCCESS_200,
    NEW_PASSW_ERROR_403,
} from "../Static/message";
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
            const message = ADMIN_500;
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
                type: SET_MESSAGE_SUCCESS,
                payload: RESET_PASSW_SUCCESS_200,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = ADMIN_500;


            dispatch({
                type: RESET_PASSW_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
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
                type: SET_MESSAGE_SUCCESS,
                payload: NEW_PASSW_SUCCESS_200,
            });

            return Promise.resolve();
        },
        (error) => {
            console.log(error.response)
            let message = "Error"
            if ((error.response.status === 403) || (error.response.data.type === "authorization")) {
                message = NEW_PASSW_ERROR_403;
            } else {
                message = ADMIN_500;
            }
            dispatch({
                type: NEW_PASSW_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            return Promise.reject();
        }
    );
};