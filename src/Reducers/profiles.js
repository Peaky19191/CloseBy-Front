import { SET_USER_ID, CLEAR_USER_ID } from "../Constants/actionTypes";


const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_ID:
            return { id: payload };

        case CLEAR_USER_ID:
            return { id: "" };

        default:
            return state;
    }
}