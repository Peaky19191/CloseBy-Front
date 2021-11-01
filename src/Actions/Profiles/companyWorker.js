import {
    REGISTER_COMP_WORKER_SUCCESS,
    REGISTER_COMP_WORKER_FAIL,
    SET_MESSAGE,
    SET_COMP_WORKER_ID,
    CLEAR_COMP_WORKER_ID
} from "../../Constants/actionTypes";

import CompanyWorkerService from "../../Services/Profiles/companyWorker.service";

export const regCompWorker = (firstName, lastName, gender, email, companyId) => (dispatch) => {
    return CompanyWorkerService.registerCompanyWorker(firstName, lastName, gender, email, companyId).then(
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

export const setCompWorkerId = (idToPass) => (dispatch) => {
    dispatch({
        type: SET_COMP_WORKER_ID,
        payload: idToPass,
    });
};

export const clearCompWorkerId = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMP_WORKER_ID,
    });
};