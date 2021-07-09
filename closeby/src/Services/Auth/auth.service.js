import axios from "axios";

const register = (firstName, lastName, gender, email, password) => {
  return axios.post("http://localhost:5000/api/user/register", {
    firstName,
    lastName,
    gender,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post("http://localhost:5000/api/identity/login", {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");

};

export default {
  register,
  login,
  logout,
};