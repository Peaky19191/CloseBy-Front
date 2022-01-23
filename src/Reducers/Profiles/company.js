import {
    CLEAR_COMPANY, DELETE_COMPANY_FAIL, DELETE_COMPANY_SUCCESS, EDIT_COMPANY_FAIL, EDIT_COMPANY_SUCCESS, GET_COMPANY_ID_FAIL, GET_COMPANY_ID_SUCCESS, GET_COMPANY_LIST_FAIL, GET_COMPANY_LIST_SUCCESS, REGISTER_COMPANY_FAIL, REGISTER_COMPANY_SUCCESS, SET_COMPANY
} from "../../Constants/actionTypes";

const company = JSON.parse(localStorage.getItem("Company"));

const initialState = company
    ? { isLoggedIn: true, company: company }
    : { isLoggedIn: false, company: null };

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
        case SET_COMPANY:
            return { ...state, company: payload };

        case CLEAR_COMPANY:
            return { ...state, company: "" };

        default:
            return state;
    }
}