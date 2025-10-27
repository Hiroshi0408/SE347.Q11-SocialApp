import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../api/authService";
import { useAuth } from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation
  const validateLogin = (values) => {
    const newErrors = {};

    if (!values.username) {
      newErrors.username = "Please fill in all fields";
    }

    if (!values.password) {
      newErrors.password = "Please fill in all fields";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  // Custom hook
  const { values, errors, inputRefs, handleChange, handleSubmit, setErrors } =
    useForm(
      {
        username: "",
        password: "",
      },
      validateLogin
    );

  // Submit callback
  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Gọi API login
      // await login(formData);
      const response = await authService.login({
        username: formData.username,
        password: formData.password,
      });

      console.log("Login success:", response);
      // Chuyển sang home
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);

      // Hiển thị error từ backend
      setErrors({
        username: error.message || "Invalid username or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1 className="logo">SocialApp</h1>
          <p className="tagline">Connect with friends and the world</p>
          <div
            style={{
              background: "#e3f2fd",
              padding: "12px",
              borderRadius: "8px",
              margin: "16px 0",
              fontSize: "13px",
              textAlign: "left",
            }}
          >
            <strong> Test Account:</strong>
            <br />
            Username: <code>jiashin</code>
            <br />
            Password: <code>jiacute0101</code>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Username */}
          <div className="input-group">
            <input
              ref={inputRefs.username}
              type="text"
              name="username"
              placeholder="Username or email"
              value={values.username}
              onChange={handleChange}
              className={`input-field ${errors.username ? "input-error" : ""}`}
              disabled={isLoading}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              ref={inputRefs.password}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? "input-error" : ""}`}
              disabled={isLoading}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          {/* Remember Me */}
          <div className="remember-section">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
          </div>

          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="register-section">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
