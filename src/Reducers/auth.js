import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../Constants/actionTypes";

const profile = JSON.parse(localStorage.getItem("profile"));

const initialState = profile
    ? { isLoggedIn: true, profile }
    : { isLoggedIn: false, profile: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                profile: payload.profile,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                profile: null,
            };
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                isLoggedIn: false,
                profile: null,
            };
        default:
            return state;
    }
}