import axios from "axios";

const getAdressAPI = (lat, lng) => {
    return axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + process.env.REACT_APP_API_KEY
    );
};

// eslint-disable-next-line
export default {
    getAdressAPI,
}
