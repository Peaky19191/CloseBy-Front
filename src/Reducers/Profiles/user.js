import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    SET_USER_ID,
    CLEAR_USER_ID,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
} from "../../Constants/actionTypes";

const initialState = {};

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
                isLoggedIn: true,
            };
        case EDIT_USER_FAIL:
            return {
                ...state,
                isLoggedIn: true,
            };
        case SET_USER_ID:
            return { id_user: payload };

        case CLEAR_USER_ID:
            return { id_user: "" };

        default:
            return state;
    }
}