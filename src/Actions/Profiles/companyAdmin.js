import { toast } from 'react-toastify';
import {
    CLEAR_COMP_ADMIN, DELETE_COMP_ADMIN_FAIL, DELETE_COMP_ADMIN_SUCCESS, EDIT_COMP_ADMIN_FAIL, EDIT_COMP_ADMIN_SUCCESS, GET_COMP_ADMIN_ID_FAIL, GET_COMP_ADMIN_ID_SUCCESS, GET_COMP_ADMIN_LIST_FAIL, GET_COMP_ADMIN_LIST_SUCCESS, REGISTER_COMP_ADMIN_FAIL, REGISTER_COMP_ADMIN_SUCCESS, SET_COMP_ADMIN, SET_MESSAGE, SET_MESSAGE_FAIL, SET_MESSAGE_SUCCESS
} from "../../Constants/actionTypes";
import CompanyAdminService from "../../Services/Profiles/companyAdmin.service";
import {
    ADMIN_500, ADMIN_EDIT_SUCCESS_200, ADMIN_REG_SUCCESS_200, ERROR_400, ERROR_401, PROFILE_EDIT_SUCCESS_200
} from "../../Static/message";

export const regCompAdmin = (firstName, lastName, gender, email, companyId) => (dispatch) => {
    return CompanyAdminService.registerCompanyAdminAPI(firstName, lastName, gender, email, companyId).then(
        (response) => {
            dispatch({
                type: REGISTER_COMP_ADMIN_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: ADMIN_REG_SUCCESS_200,
            });

            toast.success("Company Admin has been successfuly registered.")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.data.type === "validation") || (error.response.data.errors[0].errorMessage === "email has to be unique")) {
                message = ERROR_400;
            } else {
                if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                    message = ERROR_401;
                } else {
                    message = ADMIN_500;
                }
            }

            dispatch({
                type: REGISTER_COMP_ADMIN_FAIL,
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

export const editCompAdmin = (id, firstName, lastName, gender, email, companyId, myAccount) => (dispatch) => {
    return CompanyAdminService.editCompanyAdminAPI(id, firstName, lastName, gender, email, companyId).then(
        (response) => {
            let message = "Success"
            if (myAccount === true) {
                message = PROFILE_EDIT_SUCCESS_200
            } else {
                message = ADMIN_EDIT_SUCCESS_200;
            }

            dispatch({
                type: EDIT_COMP_ADMIN_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: message,
            });

            toast.success("Your changes have been successfully saved.");

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.status === 400) || (error.response.data.type === "validation") || (error.response.data.errors[0].errorMessage === "email has to be unique")) {
                message = ERROR_400;
            } else {
                if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                    message = ERROR_401;
                } else {
                    message = ADMIN_500;
                }
            }

            dispatch({
                type: EDIT_COMP_ADMIN_FAIL,
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
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

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

            toast.success("Company Admin has been successfully deleted.")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: DELETE_COMP_ADMIN_FAIL,
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
            let message = "Error"
            if ((error.response.statusText === "Unauthorized") || (error.response.status === 401) || (error.response.data.code === "RefreshTokenFailed")) {
                message = ERROR_401;
            } else {
                message = ADMIN_500;
            }

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