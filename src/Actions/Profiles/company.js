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
} from "../../Constants/actionTypes";

import CompanyService from "../../Services/Profiles/company.service";

export const regCompany = (name) => (dispatch) => {
    return CompanyService.registerCompany(name).then(
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
    return CompanyService.editCompanyAPI(id, name).then(
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