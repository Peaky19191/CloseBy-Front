import {
    REGISTER_COMP_WORKER_SUCCESS,
    REGISTER_COMP_WORKER_FAIL,
    SET_COMP_WORKER_ID,
    CLEAR_COMP_WORKER_ID,
    EDIT_COMP_WORKER_SUCCESS,
    EDIT_COMP_WORKER_FAIL,
} from "../../Constants/actionTypes";

const initialState = {};

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
        case SET_COMP_WORKER_ID:
            return { ...state, id_comp_worker: payload };

        case CLEAR_COMP_WORKER_ID:
            return { ...state, id_comp_worker: "" };

        default:
            return state;
    }
}
