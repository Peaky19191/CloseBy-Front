import {
    REGISTER_COMP_ADMIN_SUCCESS,
    REGISTER_COMP_ADMIN_FAIL,
    SET_MESSAGE,
    SET_COMP_ADMIN,
    CLEAR_COMP_ADMIN,
    EDIT_COMP_ADMIN_SUCCESS,
    EDIT_COMP_ADMIN_FAIL,
    GET_COMP_ADMIN_LIST_SUCCESS,
    GET_COMP_ADMIN_LIST_FAIL,
    DELETE_COMP_ADMIN_SUCCESS,
    DELETE_COMP_ADMIN_FAIL,
    GET_COMP_ADMIN_ID_SUCCESS,
    GET_COMP_ADMIN_ID_FAIL,
} from "../../Constants/actionTypes";

import CompanyAdminService from "../../Services/Profiles/companyAdmin.service";

export const regCompAdmin = (firstName, lastName, gender, email, companyId) => (dispatch) => {
    return CompanyAdminService.registerCompanyAdminAPI(firstName, lastName, gender, email, companyId).then(
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

export const setCompAdmin = (compAdmin) => (dispatch) => {

    localStorage.setItem("CompanyAdmin", JSON.stringify(compAdmin));
    dispatch({
        type: SET_COMP_ADMIN,
        payload: compAdmin,
    });
};

export const clearCompAdminId = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMP_ADMIN,
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

export const getCompAdminListDispatch = (pageNumber, rowsPerPage, companyId) => (dispatch) => {
    return CompanyAdminService.getCompAdminListAPI(pageNumber, rowsPerPage, companyId).then(
        (response) => {
            dispatch({
                type: GET_COMP_ADMIN_LIST_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_COMP_ADMIN_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteCompAdminDispatch = (id, companyId) => (dispatch) => {
    return CompanyAdminService.deleteCompAdminAPI(id, companyId).then(
        (response) => {
            dispatch({
                type: DELETE_COMP_ADMIN_SUCCESS,
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
                type: DELETE_COMP_ADMIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getCompAdminIdDispatch = (id) => (dispatch) => {
    return CompanyAdminService.getCompAdminIdAPI(id).then(
        (response) => {
            dispatch({
                type: GET_COMP_ADMIN_ID_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_COMP_ADMIN_ID_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};