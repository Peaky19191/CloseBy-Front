// import {
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT,
// } from "../actions/types";

// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//     ? { isLoggedIn: true, user }
//     : { isLoggedIn: false, user: null };

// export default function (state = initialState, action) {
//     const { type, payload } = action;

//     switch (type) {
//         case REGISTER_SUCCESS:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//             };
//         case REGISTER_FAIL:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//             };
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isLoggedIn: true,
//                 user: payload.user,
//             };
//         case LOGIN_FAIL:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//                 user: null,
//             };
//         case LOGOUT:
//             return {
//                 ...state,
//                 isLoggedIn: false,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// }

import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default authReducer;
