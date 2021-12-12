import {
    REGISTER_COMPANY_SUCCESS,
    REGISTER_COMPANY_FAIL,
    SET_MESSAGE,
    SET_COMPANY_ID,
    CLEAR_COMPANY_ID,
    SET_COMPANY_NAME,
    CLEAR_COMPANY_NAME,
    EDIT_COMPANY_SUCCESS,
    EDIT_COMPANY_FAIL,
    GET_COMPANY_LIST_SUCCESS,
    GET_COMPANY_LIST_FAIL,
    DELETE_COMPANY_SUCCESS,
    DELETE_COMPANY_FAIL,
    GET_COMPANY_ID_SUCCESS,
    GET_COMPANY_ID_FAIL,
} from "../../Constants/actionTypes";

import CompanyService from "../../Services/Profiles/company.service";

export const regCompany = (name) => (dispatch) => {
    return CompanyService.registerCompanyApi(name).then(
        (response) => {
            dispatch({
                type: REGISTER_COMPANY_SUCCESS,
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
                type: REGISTER_COMPANY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const setCompanyId = (idToPass) => (dispatch) => {
    dispatch({
        type: SET_COMPANY_ID,
        payload: idToPass,
    });
};

export const clearCompanyId = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMPANY_ID,
    });
};

export const setCompanyName = (name) => (dispatch) => {
    dispatch({
        type: SET_COMPANY_NAME,
        payload: name,
    });
};

export const clearCompanyName = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMPANY_NAME,
    });
};

export const editCompany = (id, name) => (dispatch) => {
    return CompanyService.editCompanyApi(id, name).then(
        (response) => {
            dispatch({
                type: EDIT_COMPANY_SUCCESS,
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
                type: EDIT_COMPANY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getCompanyListDispatch = (pageNumber, rowsPerPage) => (dispatch) => {
    return CompanyService.getCompanyListApi(pageNumber, rowsPerPage).then(
        (response) => {
            dispatch({
                type: GET_COMPANY_LIST_SUCCESS,
                payload: response.data,
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
                type: GET_COMPANY_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteCompanyDispatch = (id) => (dispatch) => {
    return CompanyService.deleteCompanyApi(id).then(
        (response) => {
            dispatch({
                type: DELETE_COMPANY_SUCCESS,
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
                type: DELETE_COMPANY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getCompanyIdDispatch = (id) => (dispatch) => {
    return CompanyService.getCompanyIdApi(id).then(
        (response) => {
            dispatch({
                type: GET_COMPANY_ID_SUCCESS,
                payload: response.data,
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
                type: GET_COMPANY_ID_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};