import {
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    SET_EVENT_LOC,
    CLEAR_EVENT_LOC,

} from "../../Constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_EVENT_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            };
        case REGISTER_EVENT_FAIL:
            return {
                ...state,
                isLoggedIn: true,
            };
        case SET_EVENT_LOC:
            return { event_loc: payload };

        case CLEAR_EVENT_LOC:
            return { event_loc: "" };

        default:
            return state;
    }
}
