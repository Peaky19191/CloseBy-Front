import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE,
    GET_USERS,
} from "../constants/actionTypes";

import GlobAdminService from "../services/globAdmin.service";

export const regCustAdmin = (firstName, lastName, gender, email) => (dispatch) => {
    return GlobAdminService.registerCustomerAdmin(firstName, lastName, gender, email).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
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
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getUsersListGlAdm = (page, rowsPerPage) => async (dispatch) => {
    try {
        const res = await GlobAdminService.getUsersList(page, rowsPerPage);

        dispatch({
            type: GET_USERS,
            payload: res.data.items,
        });
    } catch (err) {
        console.log(err);
    }
};
