import {
    REGISTER_COMPANY_SUCCESS,
    REGISTER_COMPANY_FAIL,
    SET_COMPANY_ID,
    CLEAR_COMPANY_ID
} from "../../Constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_COMPANY_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            };
        case REGISTER_COMPANY_FAIL:
            return {
                ...state,
                isLoggedIn: true,
            };
        case SET_COMPANY_ID:
            return { id_company: payload };

        case CLEAR_COMPANY_ID:
            return { id_company: "" };

        default:
            return state;
    }
}
