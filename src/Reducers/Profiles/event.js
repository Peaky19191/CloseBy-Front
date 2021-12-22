import {
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    SET_CURRENT_EVENT_LOC,
    CLEAR_CURRENT_EVENT_LOC,
    SET_NEW_EVENT_LOC,
    CLEAR_NEW_EVENT_LOC,
    SET_EVENT,
    CLEAR_EVENT,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_LIST_FAIL,
    GET_EVENT_LIST_ALL_SUCCESS,
    GET_EVENT_LIST_ALL_FAIL,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    GET_EVENT_ID_SUCCESS,
    GET_EVENT_ID_FAIL,
    CLEAN_EVENT_LIST,
    CLEAN_EVENT_LIST_ALL,
    GET_EVENT_LIST_FOR_USER_SUCCESS,
    GET_EVENT_LIST_FOR_USER_FAIL,
} from "../../Constants/actionTypes";

const event = JSON.parse(localStorage.getItem("Event"));

const initialState = event
    ? { isLoggedIn: true, event: event }
    : { isLoggedIn: false, event: null };

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

        case SET_EVENT:
            return { ...state, event: payload };

        case CLEAR_EVENT:
            return { ...state, event: "" };
        case GET_EVENT_LIST_SUCCESS:
            return {
                ...state,
                event_list: payload
            };
        case GET_EVENT_LIST_FAIL:
            return {
                ...state,
            };
        case CLEAN_EVENT_LIST:
            return {
            };
        case GET_EVENT_LIST_ALL_SUCCESS:
            return {
                ...state,
                event_list: payload
                // event_list: [...state.event_list, ...payload]
                // event_list: state.event_list.concat(payload)
            };
        case GET_EVENT_LIST_ALL_FAIL:
            return {
                ...state,
            };
        // case GET_EVENT_LIST_FOR_USER_SUCCESS:
        //     return {
        //         ...state,
        //         event_list_for_user: [...state.event_list, ...payload.items],
        //         // event_list: state.event_list_for_user
        //     }
        // case GET_EVENT_LIST_FOR_USER_FAIL:
        //     return {
        //         ...state,
        //     };
        case CLEAN_EVENT_LIST_ALL:
            return {
            };
        case DELETE_EVENT_SUCCESS:
            return {
                ...state,
            };
        case DELETE_EVENT_FAIL:
            return {
                ...state,
            };
        case GET_EVENT_ID_SUCCESS:
            return {
                ...state,
                get_event_id: payload
            };
        case GET_EVENT_ID_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}
