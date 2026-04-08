import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "./Login.css";

const Login = ({ setIsLoggedIn, addToast }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      // Login
      try {
        console.log("[DEBUG] Trying to login user:", { email: formData.email });
        const response = await authService.login(formData.email, formData.password);
        console.log("[DEBUG] Login response:", response);

        // Fixed saveToken
        authService.saveToken(response);

        setIsLoggedIn(true);
        if (addToast)
          addToast(`Welcome back, ${response.name || response.data?.name}! 👋`, "success");
        navigate("/");
      } catch (err) {
        console.error("[ERROR] Login error:", err);
        const errorMsg = err.response?.data?.message || "Invalid email or password";
        setError(errorMsg);
        if (addToast) addToast(errorMsg, "error");
      }
    } else {
      // Register
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        if (addToast) addToast("Passwords do not match", "error");
        setLoading(false);
        return;
      }
      if (formData.password.length < 4) {
        setError("Password must be at least 4 characters");
        if (addToast) addToast("Password must be at least 4 characters", "error");
        setLoading(false);
        return;
      }

      try {
        console.log("[DEBUG] Trying to register user:", { name: formData.name, email: formData.email });
        await authService.register(formData.name, formData.email, formData.password);

        // Auto login after register
        const loginResponse = await authService.login(formData.email, formData.password);
        console.log("[DEBUG] Auto-login after register:", loginResponse);

        authService.saveToken(loginResponse);

        setIsLoggedIn(true);
        if (addToast)
          addToast(`Account created! Welcome ${formData.name}! 🎉`, "success");
        navigate("/");
      } catch (err) {
        console.error("[ERROR] Registration error:", err);
        let errorMsg = "Registration failed. Email may already exist.";

        if (err.response?.status === 409) {
          errorMsg = "Email already exists! Please use another email.";
        } else if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }

        setError(errorMsg);
        if (addToast) addToast(errorMsg, "error");
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Login to your New Mart account" : "Sign up to start shopping"}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "LOGIN" : "REGISTER"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({ name: "", email: "", password: "", confirmPassword: "" });
              }}
            >
              {isLogin ? " Register" : " Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;