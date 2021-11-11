import {
    REGISTER_COMP_ADMIN_SUCCESS,
    REGISTER_COMP_ADMIN_FAIL,
    SET_COMP_ADMIN_ID,
    CLEAR_COMP_ADMIN_ID,
    EDIT_COMP_ADMIN_SUCCESS,
    EDIT_COMP_ADMIN_FAIL,
} from "../../Constants/actionTypes";

const initialState = {};

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
        case SET_COMP_ADMIN_ID:
            return { id_comp_admin: payload };

        case CLEAR_COMP_ADMIN_ID:
            return { id_comp_admin: "" };

        default:
            return state;
    }
}
