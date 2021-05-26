import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    AUTH
} from "../constants/actionTypes";

import * as api from '../api/index.js';

export const register = (firstName, lastName, gender, email, password) => (dispatch) => {
    return null;
};

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
};

// (email, password) => (dispatch) => {
//     return AuthService.login(email, password).then(
//         (data) => {
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload: { user: data },
//             });

//             return Promise.resolve();
//         },
//         (error) => {
//             const message = error.response.data.type;
//             // (error.response &&
//             //     error.response.data &&
//             //     error.response.data.message) ||
//             // error.message ||
//             // error.toString();
//             dispatch({
//                 type: LOGIN_FAIL,
//             });

//             dispatch({
//                 type: SET_MESSAGE,
//                 payload: message,
//             });

//             return Promise.reject();
//         }
//     );
// };

// export const logout = () => (dispatch) => {
//     AuthService.logout();
//     dispatch({
//         type: LOGOUT,
//     });
// };