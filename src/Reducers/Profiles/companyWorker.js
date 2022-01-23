import {
    CLEAN_COMP_WORKER_LIST, CLEAR_COMP_WORKER, DELETE_COMP_WORKER_FAIL, DELETE_COMP_WORKER_SUCCESS, EDIT_COMP_WORKER_FAIL, EDIT_COMP_WORKER_SUCCESS, GET_COMP_WORKER_ID_FAIL, GET_COMP_WORKER_ID_SUCCESS, GET_COMP_WORKER_LIST_FAIL, GET_COMP_WORKER_LIST_SUCCESS, REGISTER_COMP_WORKER_FAIL, REGISTER_COMP_WORKER_SUCCESS, SET_COMP_WORKER
} from "../../Constants/actionTypes";

const companyWorker = JSON.parse(localStorage.getItem("CompanyWorker"));

const initialState = companyWorker
    ? { isLoggedIn: true, comp_worker: companyWorker }
    : { isLoggedIn: false, comp_worker: null };

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_COMP_WORKER_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_COMP_WORKER_FAIL:
            return {
                ...state,
            };
        case EDIT_COMP_WORKER_SUCCESS:
            return {
                ...state,
            };
        case EDIT_COMP_WORKER_FAIL:
            return {
                ...state,
            };
        case SET_COMP_WORKER:
            return { ...state, comp_worker: payload };

        case CLEAR_COMP_WORKER:
            return { ...state, comp_worker: "" };
        case GET_COMP_WORKER_LIST_SUCCESS:
            return {
                ...state, comp_worker_list: payload
            };
        case GET_COMP_WORKER_LIST_FAIL:
            return {
                ...state,
            };
        case CLEAN_COMP_WORKER_LIST:
            return {
            };
        case DELETE_COMP_WORKER_SUCCESS:
            return {
                ...state,
            };
        case DELETE_COMP_WORKER_FAIL:
            return {
                ...state,
            };
        case GET_COMP_WORKER_ID_SUCCESS:
            return {
                ...state,
                get_comp_worker_id: payload
            };
        case GET_COMP_WORKER_ID_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}
