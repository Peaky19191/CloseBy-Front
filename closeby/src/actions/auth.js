import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_MESSAGE,
    AUTH
} from "../constants/actionTypes";

import * as api from '../api/index.js';

export const register = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.postRegister(formData);

        dispatch({ type: AUTH, data });

        router.push('/');

    } catch (error) {
        const errorCode = error.response.status;
        let message =
            // error.response.data.type;
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        console.log(error);
        console.log(error.response.data.type);
        if (errorCode === 400 && error.response.data.type === "validation") {
            message = "Some variables are missing"
        }
        dispatch({
            type: REGISTER_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

    }
};

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.postLogin(formData);

        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        const errorCode = error.response.status;

        let message = error.response.data.type;
        // (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        // error.message ||
        // error.toString();

        console.log(error);
        if (errorCode === 401) {
            message = "Email and Password do not match"
        } else if (errorCode === 400) {
            message = "Some variables are invalid"
        }

        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
};