import {
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    SET_CURRENT_EVENT_LOC,
    CLEAR_CURRENT_EVENT_LOC,
    SET_NEW_EVENT_LOC,
    CLEAR_NEW_EVENT_LOC,
    SET_EVENT_ID,
    CLEAR_EVENT_ID,

} from "../../Constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_EVENT_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_EVENT_FAIL:
            return {
                ...state,
            };
        case SET_CURRENT_EVENT_LOC:
            return { ...state, current_event_loc: payload };

        case CLEAR_CURRENT_EVENT_LOC:
            return { ...state, current_event_loc: "" };

        case SET_NEW_EVENT_LOC:
            return { ...state, new_event_loc: payload };

        case CLEAR_NEW_EVENT_LOC:
            return { ...state, new_event_loc: "" };

        case SET_EVENT_ID:
            return { ...state, id_event: payload };

        case CLEAR_EVENT_ID:
            return { ...state, id_event: "" };

        default:
            return state;
    }
}
