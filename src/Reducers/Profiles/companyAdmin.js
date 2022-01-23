import {
    CLEAN_COMP_ADMIN_LIST, CLEAR_COMP_ADMIN, DELETE_COMP_ADMIN_FAIL, DELETE_COMP_ADMIN_SUCCESS, EDIT_COMP_ADMIN_FAIL, EDIT_COMP_ADMIN_SUCCESS, GET_COMP_ADMIN_ID_FAIL, GET_COMP_ADMIN_ID_SUCCESS, GET_COMP_ADMIN_LIST_FAIL, GET_COMP_ADMIN_LIST_SUCCESS, REGISTER_COMP_ADMIN_FAIL, REGISTER_COMP_ADMIN_SUCCESS, SET_COMP_ADMIN
} from "../../Constants/actionTypes";


const companyAdmin = JSON.parse(localStorage.getItem("CompanyAdmin"));

const initialState = companyAdmin
    ? { isLoggedIn: true, comp_admin: companyAdmin }
    : { isLoggedIn: false, comp_admin: null };

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_COMP_ADMIN_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_COMP_ADMIN_FAIL:
            return {
                ...state,
            };
        case EDIT_COMP_ADMIN_SUCCESS:
            return {
                ...state,
            };
        case EDIT_COMP_ADMIN_FAIL:
            return {
                ...state,
            };
        case SET_COMP_ADMIN:
            return { ...state, comp_admin: payload };
        case CLEAR_COMP_ADMIN:
            return { ...state, comp_admin: "" };
        case GET_COMP_ADMIN_LIST_SUCCESS:
            return {
                ...state,
                comp_admin_list: payload
            };
        case GET_COMP_ADMIN_LIST_FAIL:
            return {
                ...state,
            };
        case CLEAN_COMP_ADMIN_LIST:
            return {
            };
        case DELETE_COMP_ADMIN_SUCCESS:
            return {
                ...state,
            };
        case DELETE_COMP_ADMIN_FAIL:
            return {
                ...state,
            };
        case GET_COMP_ADMIN_ID_SUCCESS:
            return {
                ...state,
                get_comp_admin_id: payload
            };
        case GET_COMP_ADMIN_ID_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}
