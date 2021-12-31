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
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_FAIL,
} from "../../Constants/actionTypes";
import {
    ADMIN_500,
    ERROR_400,
    ADMIN_REG_SUCCESS_200,
    ADMIN_EDIT_SUCCESS_200,
    PROFILE_EDIT_SUCCESS_200
} from "../../Static/message";
import CompanyAdminService from "../../Services/Profiles/companyAdmin.service";

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

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.data.type === "validation") || (error.response.data.errors[0].errorMessage === "email has to be unique")) {
                message = ERROR_400;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: REGISTER_COMP_ADMIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
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

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.status === 400) || (error.response.data.type === "validation") || (error.response.data.errors[0].errorMessage === "email has to be unique")) {
                message = ERROR_400;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: EDIT_COMP_ADMIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
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