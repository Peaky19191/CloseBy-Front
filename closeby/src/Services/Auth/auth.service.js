import axios from "axios";

const login = (email, password) => {
  return axios
    .post("http://localhost:5000/api/identity/login", {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("profile", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("profile");

};

export default {
  login,
  logout,
};