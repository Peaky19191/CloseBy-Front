import {
    REGISTER_COMP_ADMIN_SUCCESS,
    REGISTER_COMP_ADMIN_FAIL,
    SET_MESSAGE,
    SET_COMP_ADMIN_ID,
    CLEAR_COMP_ADMIN_ID,
    EDIT_COMP_ADMIN_SUCCESS,
    EDIT_COMP_ADMIN_FAIL,
} from "../../Constants/actionTypes";

import CompanyAdminService from "../../Services/Profiles/companyAdmin.service";

export const regCompAdmin = (firstName, lastName, gender, email, companyId) => (dispatch) => {
    return CompanyAdminService.registerCompanyAdmin(firstName, lastName, gender, email, companyId).then(
        (response) => {
            dispatch({
                type: REGISTER_COMP_ADMIN_SUCCESS,
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
                type: REGISTER_COMP_ADMIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const setCompAdminId = (idToPass) => (dispatch) => {
    dispatch({
        type: SET_COMP_ADMIN_ID,
        payload: idToPass,
    });
};

export const clearCompAdminId = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMP_ADMIN_ID,
    });
};

export const editCompAdmin = (id, firstName, lastName, gender, email, companyId) => (dispatch) => {
    return CompanyAdminService.editCompanyAdminAPI(id, firstName, lastName, gender, email, companyId).then(
        (response) => {
            dispatch({
                type: EDIT_COMP_ADMIN_SUCCESS,
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
                type: EDIT_COMP_ADMIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};