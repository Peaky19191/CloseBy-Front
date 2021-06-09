import { GET_USERS } from "../constants/actionTypes";

const initialState = [];

const userListGlAdm = (tutorials = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return payload;

        default:
            return tutorials;
    }
};

export default userListGlAdm;