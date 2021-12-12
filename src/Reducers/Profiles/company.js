import {
    REGISTER_COMPANY_SUCCESS,
    REGISTER_COMPANY_FAIL,
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

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_COMPANY_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_COMPANY_FAIL:
            return {
                ...state,
            };
        case EDIT_COMPANY_SUCCESS:
            return {
                ...state,
            };
        case EDIT_COMPANY_FAIL:
            return {
                ...state,
            };
        case GET_COMPANY_LIST_SUCCESS:
            return {
                ...state,
                company_list: payload
            };
        case GET_COMPANY_LIST_FAIL:
            return {
                ...state,
            };
        case DELETE_COMPANY_SUCCESS:
            return {
                ...state,
            };
        case DELETE_COMPANY_FAIL:
            return {
                ...state,
            };
        case GET_COMPANY_ID_SUCCESS:
            return {
                ...state,
                get_company_id: payload
            };
        case GET_COMPANY_ID_FAIL:
            return {
                ...state,
            };
        case SET_COMPANY_ID:
            return { ...state, id_company: payload };

        case CLEAR_COMPANY_ID:
            return { ...state, id_company: "" };

        case SET_COMPANY_NAME:
            return { ...state, name_company: payload };

        case CLEAR_COMPANY_NAME:
            return { ...state, name_company: "" };
        default:
            return state;
    }
}