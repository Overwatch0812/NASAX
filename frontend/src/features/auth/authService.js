import axios from "axios";

const BACKEND_DOMAIN = "http://127.0.0.1:7000/";

const REGISTER_URL = `${BACKEND_DOMAIN}/auth/users/`;
const User_data = `${BACKEND_DOMAIN}/auth/users/me/`;
const LOGIN_URL = `${BACKEND_DOMAIN}/auth/jwt/create/`;
const Verify_Jwt = `${BACKEND_DOMAIN}/auth/jwt/verify/`;
const ACTIVATION_URL = `${BACKEND_DOMAIN}/auth/users/activation/`;
const email_to_reset_password = `${BACKEND_DOMAIN}/auth/users/reset_password/`;
const reset_password_confirm_url = `${BACKEND_DOMAIN}/auth/users/reset_password_confirm/`;
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
    if (response.data) {
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
    }
    return response.data;
  } catch {
    (e) => console.log(e);
  }
};

// activate user
const activate = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(ACTIVATION_URL, userData, config);
    return response.data;
  } catch {
    (e) => console.log(e);
  }
};

//
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  return alert("Logged Out");
};

// load user
const load_user = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const response = await axios.get(User_data, config);
    return response.data;
  } catch {
    (e) => console.log(e);
  }
};

export const isAuthenticated = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({ token: localStorage.getItem("access") });
  try {
    const response = await axios.post(Verify_Jwt, body, config);
    if (response.data.code !== "token_not_valid") {
      return true;
    } else {
      return false;
    }
  } catch {
    (e) => console.log(e);
  }
};

// reset password
export const reset_password = async (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const response = await axios.post(email_to_reset_password, body, config);
    return response.data;
  } catch {
    (e) => console.log(e);
  }
};

// reset password confirm to get email
const resetPasswordConfirmz = async (dataz) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const body = dataz;
  try {
    const response = await axios.post(reset_password_confirm_url, body, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  signup,
  login,
  logout,
  activate,
  load_user,
  reset_password,
  resetPasswordConfirmz,
};

export default authService;
