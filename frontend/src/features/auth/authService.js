import axios from "axios";

const BACKEND_DOMAIN = "http://127.0.0.1:8000";

const REGISTER_URL = `${BACKEND_DOMAIN}/auth/users/`;
const LOGIN_URL = `${BACKEND_DOMAIN}/auth/jwt/create/`;
const ACTIVATION_URL = `${BACKEND_DOMAIN}/auth/users/activation/`;
const PASSWORD_RESET_CONFIRM_URL = `${BACKEND_DOMAIN}/auth/users/`;
const USERNAME_RESET_CONFIRM_URL = `${BACKEND_DOMAIN}/auth/users/`;

const signup = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(REGISTER_URL, userData, config);
    return response.data;
  } catch {
    (e) => {
      console.log(e);
    };
  }
};



const login = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(LOGIN_URL, userData, config);
    return response.data;
  } catch {
    (e) => console.log(e);
  }
};

const authService = { signup, login };

export default authService;
