const axios = require("axios");

const API_URI = "http://localhost:9090/api/users/";

// register user and enter response into local storage
// /api/users/register
const register = async (user) => {
  try {
    const response = await axios.post(API_URI + "register", user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// login user and enter response into local storage
// /api/users/login
const login = async (user) => {
  try {
    const response = await axios.post(API_URI + "login", user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// update user and enter repsonse into local storage
// /api/users/updateuser
const updateUser = async (userData, token) => {
  try {
    const response = await axios.put(API_URI + "updateuser", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  updateUser,
  logout,
};

export default authService;
