import {
    GET_ADRESS_SUCCESS,
    GET_ADRESS_FAIL,
    SET_MESSAGE,
} from "../../Constants/actionTypes";

import MapService from "../../Services/Map/map.service";

export const getAdressDispatch = (lat, lng) => (dispatch) => {
    return MapService.getAdressAPI(lat, lng).then(
        (response) => {
            dispatch({
                type: GET_ADRESS_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_ADRESS_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};