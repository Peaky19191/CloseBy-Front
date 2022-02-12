import axios from "axios";
import { SERVER_API } from "../../Static/API";
import TokenService from "./token.service";

const API_URL = "identity";

const login = (email, password) => {
  return axios
    .post(SERVER_API + API_URL + "/login", {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setProfile(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("profile");
};

const resetUsersPassword = (email) => {
  return axios.post(SERVER_API + API_URL + "/request-password-reset", {
    email
  });
};

const setNewUsersPassword = (newPassword, passwordResetToken) => {
  return axios.put(SERVER_API + API_URL + "/reset-password", {
    newPassword,
    passwordResetToken
  });
};

const confirmUserEmail = (emailConfirmationToken) => {
  return axios.put(SERVER_API + "user/confirm", {
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