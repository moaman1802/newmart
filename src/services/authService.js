import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// ================= Register =================
const register = async (name, email, password) => {
  console.log("[DEBUG] Trying to register user:", { name, email });
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    console.log("[DEBUG] Register response:", response.data);
    return response;
  } catch (err) {
    console.error("[ERROR] Register failed:", err.response?.data || err.message);
    throw err;
  }
};

// ================= Login =================
const login = async (email, password) => {
  console.log("[DEBUG] Trying to login user:", { email });
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("[DEBUG] Login response:", response.data);
    return response;
  } catch (err) {
    console.error("[ERROR] Login failed:", err.response?.data || err.message);
    throw err;
  }
};

// ================= Save Token =================
const saveToken = (response) => {
  if (!response || !response.data) {
    console.error("[ERROR] saveToken called with invalid response:", response);
    return;
  }
  
  const { token, email, name } = response.data;

  if (!token) {
    console.warn("[WARN] No token received from backend", response.data);
  }

  localStorage.setItem("token", token || "");
  localStorage.setItem("email", email || "");
  localStorage.setItem("name", name || "");
  localStorage.setItem("isLoggedIn", token ? "true" : "false");

  console.log("[DEBUG] Token saved to localStorage:", { token, email, name });
};

// ================= Getters =================
const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("[DEBUG] getToken:", token);
  return token;
};

const getName = () => {
  const name = localStorage.getItem("name");
  console.log("[DEBUG] getName:", name);
  return name;
};

const isLoggedIn = () => {
  const loggedIn = !!getToken();
  console.log("[DEBUG] isLoggedIn:", loggedIn);
  return loggedIn;
};

// ================= Logout =================
const logout = () => {
  console.log("[DEBUG] Logging out user");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("isLoggedIn");
};

export default {
  register,
  login,
  saveToken,
  getToken,
  getName,
  isLoggedIn,
  logout,
};