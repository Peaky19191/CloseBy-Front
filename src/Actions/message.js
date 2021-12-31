import { SET_MESSAGE, CLEAR_MESSAGE, SET_MESSAGE_SUCCESS, SET_MESSAGE_FAIL } from "../Constants/actionTypes";


export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const setMessageSuccess = (message) => ({
    type: SET_MESSAGE_SUCCESS,
    payload: message,
});

export const setMessageFail = (message) => ({
    type: SET_MESSAGE_FAIL,
    payload: message,
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});