import { CLEAR_MESSAGE, SET_MESSAGE, SET_MESSAGE_FAIL, SET_MESSAGE_SUCCESS } from "../Constants/actionTypes";

const initialState = {};

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { message: payload };

        case SET_MESSAGE_SUCCESS:
            return { message: payload, status: "success" };

        case SET_MESSAGE_FAIL:
            return { message: payload, status: "fail" };

        case CLEAR_MESSAGE:
            return { message: "" };

        default:
            return state;
    }
}