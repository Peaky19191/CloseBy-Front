import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import company from "./Profiles/company";
import companyAdmin from "./Profiles/companyAdmin";
import companyWorker from "./Profiles/companyWorker";
import user from "./Profiles/user";
import event from "./Profiles/event";


export default combineReducers({
    auth,
    message,
    company,
    companyAdmin,
    companyWorker,
    user,
    event,
});