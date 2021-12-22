import {
    REGISTER_COMP_WORKER_SUCCESS,
    REGISTER_COMP_WORKER_FAIL,
    SET_MESSAGE,
    SET_COMP_WORKER,
    CLEAR_COMP_WORKER,
    EDIT_COMP_WORKER_SUCCESS,
    EDIT_COMP_WORKER_FAIL,
    GET_COMP_WORKER_LIST_SUCCESS,
    GET_COMP_WORKER_LIST_FAIL,
    DELETE_COMP_WORKER_SUCCESS,
    DELETE_COMP_WORKER_FAIL,
    GET_COMP_WORKER_ID_SUCCESS,
    GET_COMP_WORKER_ID_FAIL,
} from "../../Constants/actionTypes";

import CompanyWorkerService from "../../Services/Profiles/companyWorker.service";

export const regCompWorker = (firstName, lastName, gender, email, companyId) => (dispatch) => {
    return CompanyWorkerService.registerCompanyWorkerAPI(firstName, lastName, gender, email, companyId).then(
        (response) => {
            dispatch({
                type: REGISTER_COMP_WORKER_SUCCESS,
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
                type: REGISTER_COMP_WORKER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const setCompWorker = (compWorker) => (dispatch) => {
    localStorage.setItem("CompanyWorker", JSON.stringify(compWorker));

    dispatch({
        type: SET_COMP_WORKER,
        payload: compWorker,
    });
};

export const clearCompWorkerId = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMP_WORKER,
    });
};

export const editCompWorker = (id, firstName, lastName, gender, email) => (dispatch) => {
    return CompanyWorkerService.editCompanyWorkerAPI(id, firstName, lastName, gender, email).then(
        (response) => {
            dispatch({
                type: EDIT_COMP_WORKER_SUCCESS,
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
                type: EDIT_COMP_WORKER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getCompWorkerListDispatch = (pageNumber, rowsPerPage, companyId) => (dispatch) => {
    return CompanyWorkerService.getCompWorkerListAPI(pageNumber, rowsPerPage, companyId).then(
        (response) => {
            dispatch({
                type: GET_COMP_WORKER_LIST_SUCCESS,
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
                type: GET_COMP_WORKER_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteCompWorkerDispatch = (id, companyId) => (dispatch) => {
    return CompanyWorkerService.deleteCompWorkerAPI(id, companyId).then(
        (response) => {
            dispatch({
                type: DELETE_COMP_WORKER_SUCCESS,
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
                type: DELETE_COMP_WORKER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getCompWorkerIdDispatch = (id) => (dispatch) => {
    return CompanyWorkerService.getCompWorkerIdAPI(id).then(
        (response) => {
            dispatch({
                type: GET_COMP_WORKER_ID_SUCCESS,
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
                type: GET_COMP_WORKER_ID_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};