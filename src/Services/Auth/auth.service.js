import axios from "axios";

const API_URL = "https://close-by-backend.herokuapp.com/Api/identity";


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

const confirmUserEmail = (emailConfirmationToken) => {
  return axios.put("https://close-by-backend.herokuapp.com/Api/user/confirm", {
    emailConfirmationToken
  });
};

// eslint-disable-next-line
export default {
  login,
  logout,
  resetUsersPassword,
  setNewUsersPassword,
  confirmUserEmail,
};