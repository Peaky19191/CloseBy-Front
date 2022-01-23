import {
    CLEAN_USER_LIST, CLEAR_USER, DELETE_USER_FAIL, DELETE_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_SUCCESS, GET_USER_ID_FAIL, GET_USER_ID_SUCCESS, GET_USER_LIST_FAIL, GET_USER_LIST_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, SET_USER
} from "../../Constants/actionTypes";


const user = JSON.parse(localStorage.getItem("User"));

const initialState = user
    ? { isLoggedIn: true, user: user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
            };
        case EDIT_USER_FAIL:
            return {
                ...state,
            };
        case SET_USER:
            return { ...state, user: payload };

        case CLEAR_USER:
            return { ...state, user: "" };
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                user_list: payload
            };
        case GET_USER_LIST_FAIL:
            return {
                ...state,
            };
        case CLEAN_USER_LIST:
            return {
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
            };
        case DELETE_USER_FAIL:
            return {
                ...state,
            };
        case GET_USER_ID_SUCCESS:
            return {
                ...state,
                get_user_id: payload
            };
        case GET_USER_ID_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}