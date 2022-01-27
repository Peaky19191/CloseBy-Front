import { CLEAR_TICKET, SET_TICKET } from "../../Constants/actionTypes";

const ticket = JSON.parse(localStorage.getItem("Ticket"));

const initialState = ticket
    ? { isLoggedIn: true, ticket: ticket }
    : { isLoggedIn: false, ticket: null };

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {     
        case SET_TICKET:
            return { ...state, ticket: payload };

        case CLEAR_TICKET:
            return { ...state, ticket: ""};

        default:
            return state;
    }
}
