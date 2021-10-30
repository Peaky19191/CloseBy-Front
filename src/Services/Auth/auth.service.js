import axios from "axios";

const API_URL = "http://localhost:5000/Api/identity";


const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
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

const resetUsersPassword = (email) => {
  return axios.post(API_URL + "/request-password-reset", {
    email
  });
};

const setNewUsersPassword = (newPassword, passwordResetToken) => {
  return axios.put(API_URL + "/reset-password", {
    newPassword,
    passwordResetToken
  });
};

export default {
  login,
  logout,
  resetUsersPassword,
  setNewUsersPassword,
};