import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    SET_USER_ID,
    CLEAR_USER_ID
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
        case SET_USER_ID:
            return { id_user: payload };

        case CLEAR_USER_ID:
            return { id_user: "" };

        default:
            return state;
    }
}