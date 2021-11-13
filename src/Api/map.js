import axios from "axios";

const getAdress = (lat, lng) => {
    return axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + process.env.REACT_APP_API_KEY
    );
};

export default {
    getAdress,
}
