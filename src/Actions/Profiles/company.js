import { toast } from 'react-toastify';
import {
    CLEAR_COMPANY, DELETE_COMPANY_FAIL, DELETE_COMPANY_SUCCESS, EDIT_COMPANY_FAIL, EDIT_COMPANY_SUCCESS, GET_COMPANY_ID_FAIL, GET_COMPANY_ID_SUCCESS, GET_COMPANY_LIST_FAIL, GET_COMPANY_LIST_SUCCESS, REGISTER_COMPANY_FAIL, REGISTER_COMPANY_SUCCESS, SET_COMPANY, SET_MESSAGE, SET_MESSAGE_FAIL, SET_MESSAGE_SUCCESS
} from "../../Constants/actionTypes";
import CompanyService from "../../Services/Profiles/company.service";
import {
    ADMIN_500, COMP_EDIT_SUCCESS_200, COMP_ERROR_400,
    COMP_REG_SUCCESS_200
} from "../../Static/message";

export const regCompany = (name) => (dispatch) => {
    return CompanyService.registerCompanyAPI(name).then(
        (response) => {
            dispatch({
                type: REGISTER_COMPANY_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: COMP_REG_SUCCESS_200,
            });

            toast.success("Company has been successfully registered.")

            return Promise.resolve();
        },
        (error) => {

            let message = "Error"
            if ((error.response.status === 400) || (error.response.data.type === "validation") || (error.response.data.errors[0].errorMessage === "name has to be unique")) {
                message = COMP_ERROR_400;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: REGISTER_COMPANY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            toast.error(message);

            return Promise.reject();
        }
    );
};

export const setCompanyDispatch = (company) => (dispatch) => {
    localStorage.setItem("Company", JSON.stringify(company));

    dispatch({
        type: SET_COMPANY,
        payload: company,
    });
};

export const clearCompanyDispatch = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMPANY,
    });
};

export const editCompany = (id, name) => (dispatch) => {
    return CompanyService.editCompanyAPI(id, name).then(
        (response) => {
            dispatch({
                type: EDIT_COMPANY_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: COMP_EDIT_SUCCESS_200,
            });

            toast.success("Your changes have been successfully saved.")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.status === 400) || (error.response.data.type === "validation") || (error.response.data.errors[0].errorMessage === "name has to be unique")) {
                message = COMP_ERROR_400;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: EDIT_COMPANY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            toast.error(message);

            return Promise.reject();
        }
    );
};

export const getCompanyListDispatch = (pageNumber, rowsPerPage) => (dispatch) => {
    return CompanyService.getCompanyListAPI(pageNumber, rowsPerPage).then(
        (response) => {
            dispatch({
                type: GET_COMPANY_LIST_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
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
                type: GET_COMPANY_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteCompanyDispatch = (id) => (dispatch) => {
    return CompanyService.deleteCompanyAPI(id).then(
        (response) => {
            dispatch({
                type: DELETE_COMPANY_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            toast.success("Company has been successfully deleted.")

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

            toast.error(message);

            return Promise.reject();
        }
    );
};

export const getCompanyIdDispatch = (id) => (dispatch) => {
    return CompanyService.getCompanyIdAPI(id).then(
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