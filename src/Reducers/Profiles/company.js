import {
    REGISTER_COMPANY_SUCCESS,
    REGISTER_COMPANY_FAIL,
    SET_COMPANY_ID,
    CLEAR_COMPANY_ID,
    SET_COMPANY_NAME,
    CLEAR_COMPANY_NAME,
    EDIT_COMPANY_SUCCESS,
    EDIT_COMPANY_FAIL,
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
