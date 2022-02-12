import { toast } from 'react-toastify';
import {
    CONFIRM_EMAIL_FAIL, CONFIRM_EMAIL_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, NEW_ACCESS_TOKEN, NEW_PASSW_FAIL, NEW_PASSW_SUCCESS, NEW_REFRESH_TOKEN, RESET_PASSW_FAIL, RESET_PASSW_SUCCESS, SET_MESSAGE, SET_MESSAGE_FAIL, SET_MESSAGE_SUCCESS
} from "../Constants/actionTypes";
import AuthService from "../Services/Auth/auth.service";
import {
    ADMIN_500, CONFIRM_EMAIL_FAIL_400, CONFIRM_EMAIL_SUCCESS_200, LOGIN_ERROR_401, NEW_PASSW_ERROR_403, NEW_PASSW_SUCCESS_200,
    RESET_PASSW_SUCCESS_200
} from "../Static/message";

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { profile: data },
            });
            toast.success("you have been logged in.")

            return Promise.resolve();
        },
        (error) => {
            console.log(error)

            console.log(error.response)
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.type === "authentication")) {
                message = LOGIN_ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            toast.warn(message)

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
    toast.warn("You have been logged out");
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
            toast.success("Check your email for confirmation link.")

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
            toast.error(message)

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
            toast.success("Your password has been successfully changed.")

            return Promise.resolve();
        },
        (error) => {
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
            toast.error(message)

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
                type: SET_MESSAGE_SUCCESS,
                payload: CONFIRM_EMAIL_SUCCESS_200,
            });
            toast.success("Your email has been successfully confirmed.")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.status === 400) || (error.response.data.type === "validation")) {
                message = CONFIRM_EMAIL_FAIL_400;
            } else {
                message = ADMIN_500;
            }
            dispatch({
                type: CONFIRM_EMAIL_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });
            toast.error(message)

            return Promise.reject();
        }
    );
};

export const newAccessToken = (accessToken) => (dispatch) => {
    dispatch({
        type: NEW_ACCESS_TOKEN,
        payload: accessToken,
    })
}

export const newRefreshToken = (refreshToken) => (dispatch) => {
    dispatch({
        type: NEW_REFRESH_TOKEN,
        payload: refreshToken,
    })
}