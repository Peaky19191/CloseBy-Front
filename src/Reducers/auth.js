import {
    LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, NEW_ACCESS_TOKEN, NEW_REFRESH_TOKEN
} from "../Constants/actionTypes";

const profile = JSON.parse(localStorage.getItem("profile"));

const initialState = profile
    ? { isLoggedIn: true, profile }
    : { isLoggedIn: false, profile: null };

// eslint-disable-next-line
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
        case NEW_ACCESS_TOKEN:
            return {
                ...state,
                profile: { ...state.profile, accessToken: payload },
            };
        case NEW_REFRESH_TOKEN:
            return {
                ...state,
                profile: { ...state.profile, refreshToken: payload },
            };
        default:
            return state;
    }
}