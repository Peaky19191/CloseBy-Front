import { CLEAN_COMP_ADMIN_LIST, CLEAN_COMP_WORKER_LIST, CLEAN_EVENT_LIST, CLEAN_EVENT_LIST_ALL, CLEAN_USER_LIST } from "../Constants/actionTypes";

export const clearCompanyAdminList = () => ({
    type: CLEAN_COMP_ADMIN_LIST,
});

export const clearCompanyWorkerList = () => ({
    type: CLEAN_COMP_WORKER_LIST,
});

export const clearEventList = () => ({
    type: CLEAN_EVENT_LIST,
});

export const clearEventAllList = () => ({
    type: CLEAN_EVENT_LIST_ALL,
});

export const clearUserList = () => ({
    type: CLEAN_USER_LIST,
});