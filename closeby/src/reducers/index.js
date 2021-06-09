import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import userListGlAdm from "./usersListGlAd";

export default combineReducers({
    auth,
    message,
    userListGlAdm,
});