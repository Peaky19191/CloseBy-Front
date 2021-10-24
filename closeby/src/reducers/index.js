import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import profiles from "./profiles";

export default combineReducers({
    auth,
    message,
    profiles
});